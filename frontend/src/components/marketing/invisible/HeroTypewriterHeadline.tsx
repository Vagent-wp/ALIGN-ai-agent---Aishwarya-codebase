import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BRAND } from '@/lib/brand';
import { heroTypewriterPhrases } from '@/lib/marketing/content';

const PRIMARY = BRAND.taglinePrimary.replace(/\.$/, '');

const CYCLING_PHRASES = heroTypewriterPhrases.map((p) => (p.endsWith('.') ? p : `${p}.`));

const LONGEST_PHRASE = CYCLING_PHRASES.reduce(
  (longest, p) => (p.length > longest.length ? p : longest),
  CYCLING_PHRASES[0] ?? ''
);

const TYPE_SPEED_MS = 58;
const DELETE_SPEED_MS = 36;
const HOLD_MS = 2600;
const START_DELAY_MS = 700;

interface HeroTypewriterHeadlineProps {
  className?: string;
}

/** Static primary headline + cycling typewriter on the muted secondary phrase */
export function HeroTypewriterHeadline({ className }: HeroTypewriterHeadlineProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const phrase = CYCLING_PHRASES[phraseIndex] ?? CYCLING_PHRASES[0] ?? '';

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setCursorOn((v) => !v), 530);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !phrase) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % CYCLING_PHRASES.length);
    } else {
      const isFirstChar = text === '' && !deleting;
      const delay = isFirstChar ? START_DELAY_MS : deleting ? DELETE_SPEED_MS : TYPE_SPEED_MS;
      timeout = setTimeout(() => {
        setText((prev) => (deleting ? prev.slice(0, -1) : phrase.slice(0, prev.length + 1)));
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phrase, phraseIndex, reducedMotion]);

  const cyclingText = reducedMotion ? CYCLING_PHRASES[0] ?? '' : text;
  const showCursor = !reducedMotion && cursorOn;

  return (
    <div className={cn('inv-hero-typewriter-wrap', className)}>
      {/* Locks row height to the longest phrase — never visible (opacity 0) */}
      <h1
        aria-hidden
        tabIndex={-1}
        className="inv-hero-typewriter inv-display inv-hero-typewriter-sizer max-w-[900px]"
      >
        <span>{PRIMARY}</span>
        <span className="inv-display-muted"> {LONGEST_PHRASE}</span>
      </h1>

      <h1
        className="inv-hero-typewriter inv-display inv-hero-typewriter-live max-w-[900px]"
        aria-live="polite"
      >
        <span className="text-[var(--color-carbon-ink)]">{PRIMARY}</span>
        <span className="inv-hero-typewriter-cycling inv-display-muted">
          {' '}
          {cyclingText}
          {showCursor && (
            <span className="inv-typewriter-cursor" aria-hidden>
              |
            </span>
          )}
        </span>
        <span className="sr-only">
          {PRIMARY} {CYCLING_PHRASES.join(', ')}
        </span>
      </h1>
    </div>
  );
}
