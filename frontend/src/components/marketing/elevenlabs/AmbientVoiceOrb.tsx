/** Decorative voice orb — chromatic gradient reserved for illustration only, never UI state */
export function AmbientVoiceOrb({
  gradient,
  size = 80,
  className = '',
}: {
  gradient: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`elevenlabs-voice-orb ${className}`}
      style={{
        width: size,
        height: size,
        background: gradient,
      }}
      aria-hidden
    />
  );
}
