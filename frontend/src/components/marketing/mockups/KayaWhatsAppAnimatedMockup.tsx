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
  /** Fits inside narrow product cards */
  compact?: boolean;
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

function MessageBubble({
  message,
  index,
  compact = false,
}: {
  message: KayaChatMessage;
  index: number;
  compact?: boolean;
}) {
  const isUser = message.from === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.02 }}
      className={cn('flex items-end', compact ? 'gap-1.5' : 'gap-2', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {!isUser && (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-[#25D366] font-bold text-white',
            compact ? 'h-5 w-5 text-[8px]' : 'h-7 w-7 text-[10px]'
          )}
        >
          K
        </div>
      )}
      <div
        className={cn(
          'max-w-[82%] whitespace-pre-line rounded-2xl leading-snug shadow-sm',
          compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-[13px]',
          isUser
            ? 'rounded-br-md bg-[#DCF8C6] text-[#111b21]'
            : 'rounded-bl-md bg-white text-[#111b21]'
        )}
      >
        {message.text}
        <p
          className={cn(
            'mt-0.5',
            compact ? 'text-[8px]' : 'mt-1 text-[10px]',
            isUser ? 'text-[#667781]' : 'text-[#8696a0]'
          )}
        >
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
  compact = false,
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
        'mx-auto w-full overflow-hidden bg-[#1a1a1a] shadow-[0_24px_64px_rgba(0,0,0,0.18)]',
        compact
          ? 'max-w-full rounded-[1.25rem] border-[4px] border-[#1a1a1a] shadow-[0_12px_32px_rgba(0,0,0,0.12)]'
          : 'max-w-[320px] rounded-[2rem] border-[6px] border-[#1a1a1a]',
        className
      )}
      aria-hidden
    >
      {/* Status bar */}
      <div
        className={cn(
          'flex items-center justify-between bg-[#075E54] pb-1 pt-2 font-medium text-white/90',
          compact ? 'px-3 text-[8px]' : 'px-5 text-[10px]'
        )}
      >
        <span>10:24</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-3 rounded-sm border border-white/80" />
          <span className="h-2 w-2 rounded-full bg-white/80" />
        </div>
      </div>

      {/* WhatsApp header */}
      <div
        className={cn(
          'flex items-center bg-[#075E54] text-white',
          compact ? 'gap-2 px-2 pb-2 pt-0.5' : 'gap-3 px-3 pb-3 pt-1'
        )}
      >
        <ArrowLeft size={compact ? 14 : 18} strokeWidth={2} className="opacity-90" />
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-[#25D366] font-bold',
            compact ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-sm'
          )}
        >
          K
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn('truncate font-semibold', compact ? 'text-[11px]' : 'text-sm')}>
            {BRAND.assistant}
          </p>
          <p className={cn('text-white/75', compact ? 'text-[9px]' : 'text-[11px]')}>online</p>
        </div>
        <div className={cn('flex items-center opacity-90', compact ? 'gap-2' : 'gap-4')}>
          <Video size={compact ? 14 : 18} strokeWidth={2} />
          <Phone size={compact ? 13 : 17} strokeWidth={2} />
          <MoreVertical size={compact ? 14 : 18} strokeWidth={2} />
        </div>
      </div>

      {/* Chat area */}
      <div
        className={cn(
          'relative bg-[#ECE5DD]',
          compact ? 'min-h-[200px] px-2 py-2.5 sm:min-h-[220px]' : 'min-h-[340px] px-3 py-4'
        )}
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
            className={compact ? 'space-y-2' : 'space-y-3'}
          >
            {visibleMessages.map((msg, i) => (
              <MessageBubble key={`${scenarioKey}-${i}`} message={msg} index={i} compact={compact} />
            ))}
            <AnimatePresence>{showTyping && <TypingIndicator />}</AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className={cn('flex items-center gap-2 bg-[#f0f0f0]', compact ? 'px-2 py-1.5' : 'px-3 py-2')}>
        <div
          className={cn(
            'flex-1 rounded-full bg-white text-[#8696a0]',
            compact ? 'px-3 py-1.5 text-[10px]' : 'px-4 py-2 text-xs'
          )}
        >
          Message
        </div>
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-[#075E54] text-white',
            compact ? 'h-7 w-7' : 'h-9 w-9'
          )}
        >
          <svg viewBox="0 0 24 24" className={cn('fill-current', compact ? 'h-4 w-4' : 'h-5 w-5')} aria-hidden>
            <path d="M1.101 21.757L23.8 12.045 1.101 2.333l.901 9.526 13.007 1.017-13.007 1.017-.901 9.864z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
