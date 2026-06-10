import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface ExpandHoverGalleryItem {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  slug?: string;
}

interface ExpandHoverGalleryProps {
  items: ExpandHoverGalleryItem[];
  onItemClick?: (index: number, item: ExpandHoverGalleryItem) => void;
  className?: string;
}

/** Expand-on-hover image row — adapted from 21st.dev Image Gallery */
export function ExpandHoverGallery({ items, onItemClick, className }: ExpandHoverGalleryProps) {
  return (
    <div className={cn('inv-project-gallery-row hidden md:flex', className)}>
      {items.map((item, index) => (
        <div
          key={`${item.slug ?? item.src}-${index}`}
          className="inv-project-gallery-item group"
          role="button"
          tabIndex={0}
          onClick={() => onItemClick?.(index, item)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onItemClick?.(index, item);
            }
          }}
          aria-label={item.title ?? item.alt}
        >
          <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
          {(item.title || item.subtitle) && (
            <div className="inv-project-gallery-overlay">
              {item.subtitle && (
                <p className="inv-project-gallery-industry">{item.subtitle}</p>
              )}
              {item.title && (
                <p className="text-base font-semibold text-white">{item.title}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface ExpandHoverGalleryMobileProps {
  items: ExpandHoverGalleryItem[];
  onItemClick?: (index: number, item: ExpandHoverGalleryItem) => void;
}

export function ExpandHoverGalleryMobile({ items, onItemClick }: ExpandHoverGalleryMobileProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:hidden">
      {items.map((item, index) => (
        <button
          key={`mobile-${item.slug ?? item.src}-${index}`}
          type="button"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl text-left"
          onClick={() => onItemClick?.(index, item)}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
            {item.subtitle && (
              <p className="inv-project-gallery-industry !text-[9px]">{item.subtitle}</p>
            )}
            {item.title && <p className="text-xs font-semibold text-white">{item.title}</p>}
          </div>
        </button>
      ))}
    </div>
  );
}

interface ExpandHoverGallerySectionProps {
  title: string;
  subtitle?: string;
  items: ExpandHoverGalleryItem[];
  archiveButton?: { text: string; href: string };
  onItemClick?: (index: number, item: ExpandHoverGalleryItem) => void;
  className?: string;
}

export function ExpandHoverGallerySection({
  title,
  subtitle,
  items,
  archiveButton,
  onItemClick,
  className,
}: ExpandHoverGallerySectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={cn('inv-section scroll-mt-24 bg-[var(--color-align-lavender)]/40', className)}
    >
      <div className="inv-container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="inv-label justify-center">
            <span className="inv-label-dot" aria-hidden />
            Our work
          </p>
          <h2 id="projects-heading" className="inv-heading-lg mt-4">
            {title}
          </h2>
          {subtitle && <p className="inv-body mt-4">{subtitle}</p>}
          {archiveButton && (
            <Link to={archiveButton.href} className="inv-btn-outline-blue mt-6 inline-flex">
              {archiveButton.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <ExpandHoverGallery items={items} onItemClick={onItemClick} />
        <ExpandHoverGalleryMobile items={items} onItemClick={onItemClick} />
      </div>
    </section>
  );
}
