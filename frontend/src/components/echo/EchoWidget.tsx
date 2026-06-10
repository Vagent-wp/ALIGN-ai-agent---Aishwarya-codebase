import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Minus } from 'lucide-react';
import { EchoTeaser } from '@/components/echo/EchoTeaser';
import { sendEchoMessage, type EchoMessage } from '@/lib/echo/api';
import { getEchoUserName, parseVisitorName, setEchoUserName } from '@/lib/echo/session';
import { LOGO } from '@/lib/brand';
import { cn } from '@/lib/utils';

type Phase = 'awaiting_name' | 'chat';

function greetingForName(name: string): string {
  return `Lovely to meet you, ${name}! I'm here to help you explore ALIGN Ecosystems — our services, industries, projects, and how to join ${name === 'there' ? 'the network' : 'ALIGN Network'}. What would you like to know?`;
}

function welcomeBack(name: string): string {
  return `Welcome back, ${name}! How can I help you today?`;
}

function initialEchoMessage(hasName: boolean, name: string | null): string {
  if (hasName && name) return welcomeBack(name);
  return "Hey! I'm Echo — your guide to ALIGN Ecosystems. How can I help you today? May I know your name?";
}

export function EchoWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [userName, setUserName] = useState<string | null>(() => getEchoUserName());
  const [phase, setPhase] = useState<Phase>(() => (getEchoUserName() ? 'chat' : 'awaiting_name'));
  const [messages, setMessages] = useState<EchoMessage[]>(() => [
    { role: 'assistant', content: initialEchoMessage(!!getEchoUserName(), getEchoUserName()) },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, open, minimized, loading]);

  useEffect(() => {
    if (open && !minimized) {
      inputRef.current?.focus();
    }
  }, [open, minimized]);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
  };

  const pushMessage = useCallback((msg: EchoMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    pushMessage({ role: 'user', content: text });

    if (phase === 'awaiting_name') {
      const name = parseVisitorName(text);
      setUserName(name);
      setEchoUserName(name);
      setPhase('chat');
      const reply = greetingForName(name);
      window.setTimeout(() => pushMessage({ role: 'assistant', content: reply }), 400);
      return;
    }

    setLoading(true);
    try {
      const history = messages.filter((m) => m.content !== initialEchoMessage(false, null));
      const reply = await sendEchoMessage(text, userName, history);
      pushMessage({ role: 'assistant', content: reply });
    } catch {
      pushMessage({
        role: 'assistant',
        content:
          "I'm having a little trouble connecting right now. You can browse /services and /contact, or email us at alignecosystems@gmail.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="echo-widget-root" aria-live="polite">
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            className="echo-chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Echo assistant chat"
          >
            <header className="echo-chat-header">
              <div className="flex items-center gap-3">
                <img src={LOGO.echoMascot} alt="" className="h-9 w-9 object-contain" draggable={false} />
                <div>
                  <p className="text-sm font-semibold text-[#061b31]">Echo</p>
                  <p className="text-xs text-[#64748d]">ALIGN website assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="echo-chat-icon-btn"
                  onClick={() => setMinimized(true)}
                  aria-label="Minimize chat"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="echo-chat-icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div ref={listRef} className="echo-chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn('echo-chat-bubble', msg.role === 'user' ? 'echo-chat-bubble-user' : 'echo-chat-bubble-echo')}
                >
                  {msg.role === 'assistant' && i === 0 && (
                    <span className="echo-chat-sender">Echo</span>
                  )}
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="echo-chat-bubble echo-chat-bubble-echo echo-chat-typing">
                  <span className="echo-typing-dot" />
                  <span className="echo-typing-dot" />
                  <span className="echo-typing-dot" />
                </div>
              )}
            </div>

            <form
              className="echo-chat-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSend();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={phase === 'awaiting_name' ? 'Your name…' : 'Ask Echo anything…'}
                className="echo-chat-input"
                maxLength={500}
                disabled={loading}
              />
              <button type="submit" className="echo-chat-send" disabled={loading || !input.trim()} aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="echo-mascot-wrap">
        <EchoTeaser visible={!open} />

        <button
          type="button"
          className="echo-mascot-btn"
          onClick={() => (open && minimized ? (setMinimized(false), setOpen(true)) : handleOpen())}
          aria-label={open ? 'Open Echo chat' : 'Chat with Echo'}
        >
          <span className="echo-mascot-shadow" aria-hidden />
          <img src={LOGO.echoMascot} alt="Echo — AI assistant" className="echo-mascot-img" draggable={false} />
        </button>
      </div>
    </div>
  );
}
