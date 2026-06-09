import { useCallback, useState } from 'react';
import { uploadConstraints, validateUpload } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

/** Upload framework — fields will be wired when onboarding architecture is provided */
export function FileUploadZone({ onFilesChange, className }: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setError(null);
      const next: File[] = [];
      for (let i = 0; i < incoming.length; i++) {
        const file = incoming[i];
        const err = validateUpload(file);
        if (err) {
          setError(err);
          return;
        }
        next.push(file);
      }
      if (files.length + next.length > uploadConstraints.maxFiles) {
        setError(`Maximum ${uploadConstraints.maxFiles} files allowed`);
        return;
      }
      const updated = [...files, ...next];
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, onFilesChange]
  );

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <label
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60',
          'bg-muted/30 p-8 transition-colors hover:border-primary/40 hover:bg-muted/50 touch-target'
        )}
      >
        <span className="text-sm font-medium">Tap to upload</span>
        <span className="mt-1 text-xs text-muted-foreground">
          JPG, PNG, WebP, PDF — max 5MB
        </span>
        <input
          type="file"
          className="hidden"
          accept={uploadConstraints.acceptedTypes.join(',')}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-2">
              <span className="truncate text-sm">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-2 text-xs font-medium text-muted-foreground hover:text-destructive"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
