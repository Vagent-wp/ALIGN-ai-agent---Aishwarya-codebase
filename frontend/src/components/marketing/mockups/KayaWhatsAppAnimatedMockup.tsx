import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import type { KayaChatMessage } from '@/lib/marketing/kayaShowcaseContent';
import { cn } from '@/lib/utils';

interface KayaWhatsAppAnimatedMockupProps {
  messages: KayaChatMessage[];
  scenarioKey: string;
  className?: string;
  autoPlay?: boolean;
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      className="flex items-end gap-2"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white">
        K
      </div>
      <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-[#90a4ae]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MessageBubble({ message, index }: { message: KayaChatMessage; index: number }) {
  const isUser = message.from === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
      className={cn('flex items-end gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white">
          K
        </div>
      )}
      <div
        className={cn(
          'max-w-[82%] whitespace-pre-line rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-sm',
          isUser
            ? 'rounded-br-md bg-[#DCF8C6] text-[#111b21]'
            : 'rounded-bl-md bg-white text-[#111b21]'
        )}
      >
        {message.text}
        <p className={cn('mt-1 text-[10px]', isUser ? 'text-[#667781]' : 'text-[#8696a0]')}>
          {isUser ? '10:24 AM' : '10:24 AM'}
          {!isUser && <span className="ml-1 text-[#53bdeb]">✓✓</span>}
        </p>
      </div>
    </motion.div>
  );
}

export function KayaWhatsAppAnimatedMockup({
  messages,
  scenarioKey,
  className,
  autoPlay = true,
}: KayaWhatsAppAnimatedMockupProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  useEffect(() => {
    clearTimers();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!autoPlay || reducedMotion) {
      setVisibleCount(messages.length);
      setShowTyping(false);
      return clearTimers;
    }

    setVisibleCount(0);
    setShowTyping(false);

    let elapsed = 600;

    messages.forEach((msg, index) => {
      if (msg.from === 'kaya' && index > 0) {
        schedule(() => setShowTyping(true), elapsed);
        elapsed += 1400;
        schedule(() => {
          setShowTyping(false);
          setVisibleCount(index + 1);
        }, elapsed);
        elapsed += 400;
      } else {
        schedule(() => setVisibleCount(index + 1), elapsed);
        elapsed += msg.from === 'user' ? 900 : 1200;
      }
    });

    return clearTimers;
  }, [messages, scenarioKey, autoPlay]);

  const visibleMessages = messages.slice(0, visibleCount);

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[320px] overflow-hidden rounded-[2rem] border-[6px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_24px_64px_rgba(0,0,0,0.18)]',
        className
      )}
      aria-hidden
    >
      {/* Status bar */}
      <div className="flex items-center justify-between bg-[#075E54] px-5 pb-1 pt-2 text-[10px] font-medium text-white/90">
        <span>10:24</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-3 rounded-sm border border-white/80" />
          <span className="h-2 w-2 rounded-full bg-white/80" />
        </div>
      </div>

      {/* WhatsApp header */}
      <div className="flex items-center gap-3 bg-[#075E54] px-3 pb-3 pt-1 text-white">
        <ArrowLeft size={18} strokeWidth={2} className="opacity-90" />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold">
          K
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{BRAND.assistant}</p>
          <p className="text-[11px] text-white/75">online</p>
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <Video size={18} strokeWidth={2} />
          <Phone size={17} strokeWidth={2} />
          <MoreVertical size={18} strokeWidth={2} />
        </div>
      </div>

      {/* Chat area */}
      <div
        className="relative min-h-[340px] bg-[#ECE5DD] px-3 py-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cdc4' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scenarioKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {visibleMessages.map((msg, i) => (
              <MessageBubble key={`${scenarioKey}-${i}`} message={msg} index={i} />
            ))}
            <AnimatePresence>{showTyping && <TypingIndicator />}</AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
        <div className="flex-1 rounded-full bg-white px-4 py-2 text-xs text-[#8696a0]">Message</div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075E54] text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M1.101 21.757L23.8 12.045 1.101 2.333l.901 9.526 13.007 1.017-13.007 1.017-.901 9.864z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
