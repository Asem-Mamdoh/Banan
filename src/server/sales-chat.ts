import 'dotenv/config';
import { generateText, type ModelMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { openai, createOpenAI } from '@ai-sdk/openai';
import { client } from '../lib/sanity.js';
import { projectsForAgentQuery } from '../lib/sanity.queries.js';

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

function getCurrencyByCountry(countryCode: string): string {
  const code = countryCode.toUpperCase();
  const map: Record<string, string> = {
    AE: 'AED',
    SA: 'SAR',
    QA: 'QAR',
    BH: 'BHD',
    KW: 'KWD',
    OM: 'OMR',
    IR: 'IRR',
    RU: 'RUB',
    GB: 'GBP',
    DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', IE: 'EUR',
  };
  return map[code] || 'USD';
}

function formatProjectsContext(projects: unknown[], userCurrency: string, exchangeRate: number): string {
  if (!Array.isArray(projects) || projects.length === 0) {
    return 'No projects are published in the CMS yet. Offer general guidance about luxury real estate in Oman and invite the user to contact BANAN for specific listings.';
  }

  const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  return projects
    .map((raw, i) => {
      const p = raw as Record<string, unknown>;
      const titleEn = String(p.titleEn ?? '');
      const titleAr = String(p.titleAr ?? '');
      const category = String(p.category ?? '');
      const specs = p.specs as Record<string, string> | undefined;
      const units = p.units as Array<Record<string, unknown>> | undefined;
      
      const specLine = specs
        ? `Area: ${specs.area ?? 'n/a'} | Bedrooms: ${specs.bedrooms ?? 'n/a'} | Type EN: ${specs.typeEn ?? ''}`
        : '';
        
      let unitsLine = '';
      if (units && units.length > 0) {
        unitsLine = '\n- **Available Units & Pricing:**\n' + units.map(u => {
          const typeEn = String(u.typeEn ?? '');
          const priceOMR = Number(u.priceOMR) || 0;
          const converted = priceOMR * exchangeRate;
          
          let priceText = `OMR ${formatter.format(priceOMR)}`;
          if (userCurrency !== 'OMR') {
            priceText += ` (approx. ${formatter.format(converted)} ${userCurrency})`;
          }
          return `  - ${typeEn}: from ${priceText}`;
        }).join('\n');
      }
        
      const img = p.mainImageUrl ? String(p.mainImageUrl) : '';
      return [
        `### Project ${i + 1}: ${titleEn} / ${titleAr}`,
        `- Category: ${category}`,
        specLine ? `- Specs: ${specLine}` : '',
        unitsLine,
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
  return `You are the BANAN Real Estate digital concierge — a highly persuasive, elite luxury real estate advisor for the Sultanate of Oman, primarily serving wealthy foreign investors and expats.

**CORE DIRECTIVES & SALES PSYCHOLOGY:**
1. **FORMATTING (CRITICAL):** Never write walls of text. ALWAYS use Markdown. Use bullet points for lists, bold text for key benefits and project names, and short paragraphs (1-2 sentences). Make it scannable and beautiful.
2. **THE BANAN ADVANTAGE:** Subtly position BANAN Real Estate as the absolute authority and the only trusted, premium gateway for foreigners to invest in Oman. 
3. **PERSUASION TACTICS:** 
   - *Exclusivity & Scarcity*: Gently highlight that premium freehold properties in Oman's ITCs (Integrated Tourism Complexes) are limited and in high global demand.
   - *The Hook*: Always mention the massive benefits for foreigners: 100% foreign ownership, 0% personal income tax, and permanent residency for the family.
4. **LEAD CAPTURE (ALWAYS CLOSE):** Never end a conversation at a dead end. ALWAYS end your reply with an engaging question or a Call-To-Action encouraging them to click the WhatsApp button to "schedule a private consultation", "get the latest exclusive pricing", or "secure their unit".
5. **TONE:** Confident, sophisticated, and warmly professional. You are an advisor to high-net-worth individuals, not a pushy salesman.

**LANGUAGE:** Follow this instruction for the current turn:${langBlock}

**STRICT RULES:**
- Do NOT invent prices, availability, or phone numbers. If asked for exact prices, explain that luxury pricing is dynamic and invite them to connect with our elite sales team via WhatsApp for the current VIP offers.
- Only discuss projects listed in the catalog below.

**PROJECT CATALOG:**
${projectBlock}`;
}

function resolveModel() {
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

export async function runSalesChat(rawBody: unknown, userCountryCode: string = 'OM'): Promise<ChatApiResponse> {
  try {
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
    
    // Currency Exchange Logic
    const userCurrency = getCurrencyByCountry(userCountryCode);
    let exchangeRate = 1;
    if (userCurrency !== 'OMR') {
      try {
        const rateRes = await fetch('https://open.er-api.com/v6/latest/OMR');
        if (rateRes.ok) {
          const rateData = await rateRes.json();
          if (rateData?.rates?.[userCurrency]) {
            exchangeRate = rateData.rates[userCurrency];
          }
        }
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
        // Fallback approximate rates (pegged currencies)
        if (userCurrency === 'USD') exchangeRate = 2.6;
        else if (userCurrency === 'AED') exchangeRate = 9.55;
        else if (userCurrency === 'SAR') exchangeRate = 9.75;
      }
    }

    const projectBlock = formatProjectsContext(projects, userCurrency, exchangeRate);
    const system = buildSystemPrompt(projectBlock, messages);

    // 1. Try Cloudflare Direct API first
    if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
      try {
        const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`;
        const cfRes = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: system },
              ...toModelMessages(messages)
            ],
            temperature: 0.65,
            max_tokens: 1024
          })
        });

        if (!cfRes.ok) {
          console.error('Cloudflare API Error:', cfRes.status, await cfRes.text());
          throw new Error('Cloudflare API failed');
        }

        const data = await cfRes.json() as any;
        return { role: 'assistant', content: (data.result?.response || '…').trim() };
      } catch (e) {
        console.error('Cloudflare direct fetch error:', e);
        return {
          error: 'The assistant could not complete a reply using Cloudflare. Please check your credentials.',
          code: 'UPSTREAM',
        };
      }
    }

    // 2. Fallback to Gemini / OpenAI
    const model = resolveModel();
    if (!model) {
      return {
        error:
          'AI is not configured. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN, or GOOGLE_GENERATIVE_AI_API_KEY, or OPENAI_API_KEY on the server.',
        code: 'MISSING_API_KEY',
      };
    }

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
