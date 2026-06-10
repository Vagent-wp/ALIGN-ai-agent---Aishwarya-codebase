import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  phrases: string[];
  speed?: number;
  deleteSpeed?: number;
  waitTime?: number;
  initialDelay?: number;
  loop?: boolean;
  className?: string;
  cursorChar?: string;
}

export function Typewriter({
  phrases,
  speed = 42,
  deleteSpeed = 28,
  waitTime = 2200,
  initialDelay = 400,
  loop = true,
  className,
  cursorChar = '|',
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;

    const phrase = phrases[index] ?? '';
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), waitTime);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= phrases.length) return loop ? 0 : prev;
        return next;
      });
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) => {
            if (deleting) return prev.slice(0, -1);
            return phrase.slice(0, prev.length + 1);
          });
        },
        text === '' && !deleting ? initialDelay : deleting ? deleteSpeed : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, speed, deleteSpeed, waitTime, initialDelay, loop, reducedMotion]);

  if (reducedMotion) {
    return <span className={cn('text-primary', className)}>{phrases[0]}</span>;
  }

  return (
    <span className={cn('inline-flex min-h-[1.2em] items-baseline', className)}>
      <span className="text-primary">{text}</span>
      <span className="ml-0.5 animate-cursor-blink text-primary/80">{cursorChar}</span>
    </span>
  );
}
