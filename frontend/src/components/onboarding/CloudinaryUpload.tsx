import { useState } from 'react';
import { uploadToCloudinary } from '@/lib/onboarding/api';
import { cn } from '@/lib/utils';

interface CloudinaryUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  folder?: string;
  className?: string;
}

export function CloudinaryUpload({
  label,
  value,
  onChange,
  accept = 'image/*,application/pdf',
  folder,
  className,
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadToCloudinary(file, folder);
      onChange(url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60',
          'bg-muted/30 p-6 transition-colors hover:border-primary/40 hover:bg-muted/50'
        )}
      >
        <span className="text-sm font-medium">{uploading ? 'Uploading…' : label}</span>
        <span className="mt-1 text-xs text-muted-foreground">Signed Cloudinary upload</span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
      </label>
      {value && (
        <p className="truncate text-xs text-muted-foreground">
          Uploaded: {value}
        </p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
