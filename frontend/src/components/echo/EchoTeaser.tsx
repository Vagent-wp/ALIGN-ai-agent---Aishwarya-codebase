import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const TEASER_MESSAGES = [
  "Hey! I'm Echo — ask me anything",
  'Questions about our services?',
  'Need help finding a page?',
];

const ROTATE_MS = 5200;
const DOT_INTERVAL_MS = 380;

/** Gentle peek cadence — visible briefly, then long quiet pause */
const HIDDEN_INITIAL_DELAY_MS = 4000;
const HIDDEN_SHOW_MS = 2600;
const HIDDEN_PAUSE_MS = 14000;

const HIDDEN_PEEK_MESSAGES = ["I'm hidden", 'find me'] as const;

function AnimatedEllipsis() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDots((d) => (d >= 3 ? 1 : d + 1));
    }, DOT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="echo-teaser-ellipsis" aria-hidden>
      {'.'.repeat(dots)}
    </span>
  );
}

/** Comic-style thought trail: small → medium → large (mascot → speech card) */
function EchoThoughtTrail() {
  return (
    <div className="echo-thought-trail" aria-hidden>
      <span className="echo-thought-dot echo-thought-dot--sm" />
      <span className="echo-thought-dot echo-thought-dot--md" />
      <span className="echo-thought-dot echo-thought-dot--lg" />
    </div>
  );
}

/** Intermittent dot · dot · circle peek while Echo is docked off-screen */
function EchoHiddenPeek() {
  const [peekVisible, setPeekVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let showTimer = 0;
    let hideTimer = 0;
    let cancelled = false;

    const runCycle = (delay: number) => {
      showTimer = window.setTimeout(() => {
        if (cancelled) return;
        setPeekVisible(true);
        hideTimer = window.setTimeout(() => {
          if (cancelled) return;
          setPeekVisible(false);
          setMessageIndex((i) => (i + 1) % HIDDEN_PEEK_MESSAGES.length);
          runCycle(HIDDEN_PAUSE_MS);
        }, HIDDEN_SHOW_MS);
      }, delay);
    };

    runCycle(HIDDEN_INITIAL_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      setPeekVisible(false);
    };
  }, []);

  return (
    <div className="echo-hidden-peek-slot" aria-live="polite">
      <AnimatePresence>
        {peekVisible && (
          <motion.div
            key={`hidden-peek-${messageIndex}`}
            className="echo-hidden-peek"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="echo-hidden-trail" aria-hidden>
              <motion.span
                className="echo-hidden-trail-dot echo-hidden-trail-dot--sm"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.03 }}
              />
              <motion.span
                className="echo-hidden-trail-dot echo-hidden-trail-dot--md"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.12 }}
              />
            </div>
            <motion.div
              className="echo-hidden-bubble"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.28, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="echo-hidden-bubble-text">{HIDDEN_PEEK_MESSAGES[messageIndex]}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface EchoTeaserProps {
  visible: boolean;
  hidden?: boolean;
}

export function EchoTeaser({ visible, hidden = false }: EchoTeaserProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible || hidden) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TEASER_MESSAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [visible, hidden]);

  if (!visible) return null;

  if (hidden) {
    return <EchoHiddenPeek />;
  }

  return (
    <div className="echo-teaser-slot">
      <EchoThoughtTrail />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="echo-teaser"
          initial={{ opacity: 0, y: 10, x: -6 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -8, x: 4 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="echo-teaser-label">Echo</span>
          <p className="echo-teaser-text">
            {TEASER_MESSAGES[index]}
            <AnimatedEllipsis />
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
