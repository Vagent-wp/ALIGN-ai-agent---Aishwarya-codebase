import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEASER_MESSAGES = [
  "Hi! I'm Echo — ask me anything",
  'Questions about our services?',
  'Need help finding the right page?',
];

const ROTATE_MS = 5200;
const DOT_INTERVAL_MS = 380;

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

interface EchoTeaserProps {
  visible: boolean;
}

export function EchoTeaser({ visible }: EchoTeaserProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TEASER_MESSAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="echo-teaser-slot">
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
