import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runSalesChat } from '../src/server/sales-chat.js';

function readBody(req: VercelRequest): Promise<unknown> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        return Promise.resolve(JSON.parse(req.body));
      } catch {
        return Promise.reject(new Error('BAD_REQUEST'));
      }
    }
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (!raw.trim()) {
          resolve(undefined);
          return;
        }
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('BAD_REQUEST'));
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    let body: unknown;
    try {
      body = await readBody(req);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON', code: 'BAD_REQUEST' });
    }

    if (body === undefined || body === null) {
      return res.status(400).json({ error: 'Missing body', code: 'BAD_REQUEST' });
    }

    const userCountry = (req.headers['x-vercel-ip-country'] as string) || 'OM';
    const result = await runSalesChat(body, userCountry);

    if ('error' in result) {
      const code = result.code;
      const status =
        code === 'BAD_REQUEST' ? 400 : code === 'MISSING_API_KEY' ? 503 : 500;
      return res.status(status).json(result);
    }

    return res.status(200).json(result);
  } catch (e) {
    console.error('api/chat:', e);
    return res.status(500).json({
      error: 'Chat endpoint failed.',
      code: 'UPSTREAM' as const,
    });
  }
}
