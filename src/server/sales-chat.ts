import 'dotenv/config';
import { generateText, type ModelMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { openai, createOpenAI } from '@ai-sdk/openai';
import { client } from '../lib/sanity';
import { projectsForAgentQuery } from '../lib/sanity.queries';

export type ChatClientMessage = { role: 'user' | 'assistant'; content: string };

export type ChatApiSuccess = { role: 'assistant'; content: string };
export type ChatApiError = {
  error: string;
  code?: 'MISSING_API_KEY' | 'BAD_REQUEST' | 'UPSTREAM';
};
export type ChatApiResponse = ChatApiSuccess | ChatApiError;

function truncate(s: string, max: number) {
  if (!s) return '';
  const t = s.trim();
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

function formatProjectsContext(projects: unknown[]): string {
  if (!Array.isArray(projects) || projects.length === 0) {
    return 'No projects are published in the CMS yet. Offer general guidance about luxury real estate in Oman and invite the user to contact BANAN for specific listings.';
  }

  return projects
    .map((raw, i) => {
      const p = raw as Record<string, unknown>;
      const titleEn = String(p.titleEn ?? '');
      const titleAr = String(p.titleAr ?? '');
      const category = String(p.category ?? '');
      const specs = p.specs as Record<string, string> | undefined;
      const specLine = specs
        ? `Area: ${specs.area ?? 'n/a'} | Bedrooms: ${specs.bedrooms ?? 'n/a'} | Type EN: ${specs.typeEn ?? ''} | Type AR: ${specs.typeAr ?? ''}`
        : '';
      const img = p.mainImageUrl ? String(p.mainImageUrl) : '';
      return [
        `### Project ${i + 1}: ${titleEn} / ${titleAr}`,
        `- Category: ${category}`,
        specLine ? `- Specs: ${specLine}` : '',
        img ? `- Main image URL: ${img}` : '',
        `- Description (EN): ${truncate(String(p.descriptionEn ?? ''), 500)}`,
        `- Description (AR): ${truncate(String(p.descriptionAr ?? ''), 500)}`,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');
}

/** Script-based hint from the latest user turn — keeps Arabic/English replies aligned with the user. */
function replyLanguageDirective(messages: ChatClientMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser?.content?.trim()) return '';

  const c = lastUser.content;
  const arabicCount = (c.match(/[\u0600-\u06FF]/g) ?? []).length;
  const latinCount = (c.match(/[A-Za-z]/g) ?? []).length;

  if (arabicCount > 0 && arabicCount >= latinCount) {
    return `

[This turn — reply language: Arabic only. The user's latest message is in Arabic script. Use fluent Modern Standard / Gulf Arabic; English only for unavoidable proper nouns.]`;
  }

  if (latinCount > 0 || arabicCount === 0) {
    return `

[This turn — reply language: English only. The user's latest message is in Latin script.]`;
  }

  return `

[This turn — match the user's language (Arabic or English) from their latest message.]`;
}

function buildSystemPrompt(projectBlock: string, messages: ChatClientMessage[]) {
  const langBlock = replyLanguageDirective(messages);
  return `You are the BANAN Real Estate digital concierge — a refined luxury real estate advisor for the Sultanate of Oman.

Tone: warm, understated, expert, never pushy. Embody "futuristic minimalism": short sentences, premium vocabulary, no filler.

Language (critical): Follow the automated "This turn" instruction below on every reply. It is derived from the user's latest message so Arabic and English stay seamless.${langBlock}

Scope: Help with BANAN's portfolio, high-level context on freehold in Integrated Tourism Complexes (ITCs) and residency programs in Oman. You are not a lawyer — frame legal or tax topics as general information and recommend licensed advisors for binding advice.

Facts: For specific projects, images, specs, or brochures, rely ONLY on the PROJECT CATALOG below (from Sanity via projectsForAgentQuery). If a detail is not listed, say you do not have it and offer to connect the user with the BANAN team via the website's WhatsApp.

Do not invent phone numbers, prices, or availability. Do not claim discounts or guarantees.

PROJECT CATALOG:
${projectBlock}`;
}

function resolveModel() {
  if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
    const cfOpenai = createOpenAI({
      baseURL: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
      apiKey: process.env.CLOUDFLARE_API_TOKEN,
      compatibility: 'compatible',
    });
    return cfOpenai('@cf/meta/llama-3.1-8b-instruct');
  }
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google('gemini-2.5-flash');
  }
  if (process.env.OPENAI_API_KEY) {
    return openai('gpt-4o-mini');
  }
  return null;
}

function toModelMessages(messages: ChatClientMessage[]): ModelMessage[] {
  const trimmed = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content?.trim())
    .slice(-28)
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content.trim().slice(0, 14000),
    }));
  return trimmed as ModelMessage[];
}

function parseChatBody(body: unknown): { messages: ChatClientMessage[] } {
  if (!body || typeof body !== 'object') {
    throw new Error('BAD_REQUEST');
  }
  const msgs = (body as { messages?: unknown }).messages;
  if (!Array.isArray(msgs)) {
    throw new Error('BAD_REQUEST');
  }
  const messages: ChatClientMessage[] = msgs
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const role = (item as { role?: string }).role;
      const content = String((item as { content?: unknown }).content ?? '');
      if (role !== 'user' && role !== 'assistant') return null;
      if (!content.trim()) return null;
      return { role, content };
    })
    .filter((m): m is ChatClientMessage => m !== null);

  if (messages.length === 0) {
    throw new Error('BAD_REQUEST');
  }
  return { messages };
}

export async function runSalesChat(rawBody: unknown): Promise<ChatApiResponse> {
  try {
    const model = resolveModel();
    if (!model) {
      return {
        error:
          'AI is not configured. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN, or GOOGLE_GENERATIVE_AI_API_KEY, or OPENAI_API_KEY on the server.',
        code: 'MISSING_API_KEY',
      };
    }

    let messages: ChatClientMessage[];
    try {
      messages = parseChatBody(rawBody).messages;
    } catch {
      return { error: 'Invalid request body.', code: 'BAD_REQUEST' };
    }

    let projects: unknown[];
    try {
      projects = await client.fetch(projectsForAgentQuery);
    } catch (e) {
      console.error('Sanity fetch for agent:', e);
      return { error: 'Could not load project data.', code: 'UPSTREAM' };
    }

    const projectBlock = formatProjectsContext(projects);
    const system = buildSystemPrompt(projectBlock, messages);

    try {
      const { text } = await generateText({
        model,
        system,
        messages: toModelMessages(messages),
        maxOutputTokens: 1024,
        temperature: 0.65,
      });
      return { role: 'assistant', content: text.trim() || '…' };
    } catch (e) {
      console.error('generateText:', e);
      return {
        error: 'The assistant could not complete a reply. Please try again.',
        code: 'UPSTREAM',
      };
    }
  } catch (e) {
    console.error('runSalesChat unexpected:', e);
    return { error: 'Unexpected server error.', code: 'UPSTREAM' };
  }
}
