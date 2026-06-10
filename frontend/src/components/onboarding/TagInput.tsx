import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

export function TagInput({ value, onChange, placeholder, suggestions = [], className }: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    }
  };

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
  );

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          >
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
      <Input
        touch
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder || 'Type and press Enter'}
      />
      {input && filtered.length > 0 && (
        <ul className="rounded-xl border border-border/60 bg-card p-2 shadow-sm">
          {filtered.slice(0, 6).map((s) => (
            <li key={s}>
              <button
                type="button"
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => addTag(s)}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
