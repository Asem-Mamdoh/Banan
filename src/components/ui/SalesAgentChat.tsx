import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

type Msg = { id: string; role: 'user' | 'assistant'; content: string };

function uid() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function safeParseChatResponse(raw: string): {
  error?: string;
  code?: string;
  role?: string;
  content?: string;
} | null {
  try {
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    return null;
  }
}

function looksLikeHtml(payload: string) {
  const t = payload.trimStart();
  return t.startsWith('<!') || t.slice(0, 6).toLowerCase() === '<html';
}

export default function SalesAgentChat() {
  const { t, isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollEnd = () => {
    try {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    scrollEnd();
  }, [messages, open, loading]);

  const ensureWelcome = useCallback(() => {
    try {
      setMessages((prev) => {
        if (prev.length > 0) return prev;
        return [{ id: uid(), role: 'assistant', content: t.chat.welcome }];
      });
    } catch {
      /* ignore */
    }
  }, [t.chat.welcome]);

  useEffect(() => {
    if (open) ensureWelcome();
  }, [open, ensureWelcome]);

  const apiBase = (import.meta.env.VITE_CHAT_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
  const endpoint = apiBase ? `${apiBase}/api/chat` : '/api/chat';

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    try {
      setError(null);

      let thread = messages;
      if (thread.length === 0) {
        thread = [{ id: uid(), role: 'assistant', content: t.chat.welcome }];
        setMessages(thread);
      }

      const userMsg: Msg = { id: uid(), role: 'user', content: text };
      const nextMessages = [...thread, userMsg];
      setMessages(nextMessages);
      setInput('');
      setLoading(true);

      let res: Response;
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
          }),
        });
      } catch {
        setError(t.chat.error);
        return;
      }

      const raw = await res.text();

      if (looksLikeHtml(raw)) {
        setError(t.chat.errorUnreachable);
        return;
      }

      if (res.status === 404) {
        setError(t.chat.errorNotFound);
        return;
      }

      if (res.status === 503) {
        setError(t.chat.configError);
        return;
      }

      const data = safeParseChatResponse(raw);

      if (!data) {
        if (res.status >= 500) setError(t.chat.errorServer);
        else setError(t.chat.errorUnreachable);
        return;
      }

      if (data.error || !res.ok) {
        if (data.code === 'MISSING_API_KEY') setError(t.chat.configError);
        else if (data.code === 'BAD_REQUEST') setError(t.chat.error);
        else setError(res.status >= 500 ? t.chat.errorServer : t.chat.error);
        return;
      }

      const content = typeof data.content === 'string' ? data.content : '';
      if (content) {
        setMessages((m) => [...m, { id: uid(), role: 'assistant', content }]);
      }
    } catch {
      setError(t.chat.error);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    try {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        void send();
      }
    } catch {
      /* ignore */
    }
  };

  /* Light “Futuristic Minimalism” — matches surface, teal accent, gold secondary */
  const panelClass =
    'border border-[#1b1c1a]/10 bg-surface/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(27,28,26,0.12)] ' +
    'ring-1 ring-white/80';

  return (
    <div className="fixed bottom-6 end-8 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`pointer-events-auto w-[min(100vw-1.5rem,400px)] h-[min(72vh,560px)] flex flex-col rounded-2xl overflow-hidden ${panelClass}`}
          >
            <div
              className={`flex items-center justify-between px-5 py-4 border-b border-[#1b1c1a]/6 bg-white/60 backdrop-blur-md ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <p className="text-[11px] font-headline font-bold uppercase tracking-[0.35em] text-secondary">
                  {t.chat.title}
                </p>
                <p className="text-[10px] text-on-surface/50 mt-1 tracking-wide">{t.chat.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="size-9 rounded-full border border-[#1b1c1a]/10 bg-white/80 text-on-surface/50 hover:text-on-surface hover:bg-white transition-colors flex items-center justify-center"
                aria-label={t.chat.close}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3 bg-[#faf9f5]/90">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[92%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#004B63]/12 text-[#1b1c1a] border border-[#004B63]/18 shadow-sm'
                        : 'bg-white text-on-surface/90 border border-[#1b1c1a]/8 shadow-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-3.5 py-2.5 text-xs text-on-surface/45 border border-[#1b1c1a]/8 bg-white/90">
                    {t.chat.thinking}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {error && (
              <p className="px-4 text-xs text-red-800/95 border-t border-[#1b1c1a]/8 pt-2 bg-red-50/90">
                {error}
              </p>
            )}

            <p className="px-4 pb-2 text-[10px] text-on-surface/45 leading-snug bg-[#faf9f5]/90">
              {t.chat.disclaimer}
            </p>

            <div
              className={`p-3 border-t border-[#1b1c1a]/8 bg-white/85 backdrop-blur-md flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.chat.placeholder}
                rows={2}
                className={`flex-1 resize-none rounded-xl bg-white border border-[#1b1c1a]/10 px-3 py-2 text-sm text-on-surface placeholder:text-on-surface/35 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/25 ${isRtl ? 'text-right' : 'text-left'}`}
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="self-end shrink-0 h-10 px-4 rounded-xl bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest border border-secondary/30 shadow-sm hover:opacity-95 disabled:opacity-40 transition-opacity"
              >
                {t.chat.send}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        layout
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto relative size-12 flex items-center justify-center rounded-full group"
        aria-label={open ? t.chat.close : t.chat.open}
      >
        <div className="absolute inset-0 rounded-full bg-surface-container shadow-xl backdrop-blur-md transition-transform group-hover:scale-110" />
        <span className="material-symbols-outlined text-2xl relative z-10 text-on-surface-variant font-bold transition-transform group-hover:-translate-y-1">
          {open ? 'expand_more' : 'chat_bubble'}
        </span>
      </motion.button>
    </div>
  );
}
