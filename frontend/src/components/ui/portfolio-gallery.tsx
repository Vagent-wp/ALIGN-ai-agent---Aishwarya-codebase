import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface PortfolioGalleryImage {
  src: string;
  alt: string;
  title?: string;
  slug?: string;
}

interface PortfolioGalleryProps {
  title?: string;
  subtitle?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: PortfolioGalleryImage[];
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number, image: PortfolioGalleryImage) => void;
  pauseOnHover?: boolean;
  marqueeRepeat?: number;
  /** `section` = homepage embed with site typography & spacing */
  variant?: 'page' | 'section';
}

export function PortfolioGallery({
  title = 'Browse my library',
  subtitle,
  archiveButton = {
    text: 'View gallery',
    href: '/projects',
  },
  images: customImages,
  className = '',
  maxHeight = 120,
  spacing = '-space-x-72 md:-space-x-80',
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4,
  variant = 'page',
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isSection = variant === 'section';

  const defaultImages: PortfolioGalleryImage[] = [
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80', alt: 'SaaS Dashboard Design' },
    { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80', alt: 'Analytics Dashboard' },
    { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80', alt: 'SaaS Platform' },
    { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80', alt: 'Mobile App' },
    { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80', alt: 'Brand Identity' },
    { src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80', alt: 'AI Marketing' },
    { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80', alt: 'Business Growth' },
    { src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80', alt: 'Enterprise UI' },
  ];

  const images = customImages ?? defaultImages;

  const cardShadow = `
    rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
    rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
    rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
    rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
  `;

  const renderArchiveLink = () => {
    const linkClass = cn(
      'group inline-flex items-center gap-2 transition-all',
      isSection
        ? 'h-11 rounded-full border-2 border-primary bg-white/80 px-6 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground'
        : 'mb-20 gap-3 rounded-full bg-foreground px-6 py-3 font-medium text-background hover:bg-foreground/90'
    );

    if (archiveButton.href.startsWith('http')) {
      return (
        <a href={archiveButton.href} className={linkClass} target="_blank" rel="noopener noreferrer">
          <span>{archiveButton.text}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      );
    }

    return (
      <Link to={archiveButton.href} className={linkClass}>
        <span>{archiveButton.text}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  };

  const galleryCards = (
    <>
      <div
        className={cn(
          'relative hidden overflow-hidden md:block',
          isSection ? 'h-[360px]' : 'h-[400px] -mb-[200px]'
        )}
      >
        <div className={cn('flex items-end justify-center pb-6 pt-32', spacing)}>
          {images.map((image, index) => {
            const totalImages = images.length;
            const middle = Math.floor(totalImages / 2);
            const distanceFromMiddle = Math.abs(index - middle);
            const staggerOffset = maxHeight - distanceFromMiddle * 20;
            const zIndex = totalImages - index;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
            const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

            return (
              <motion.div
                key={`${image.src}-${index}`}
                className="group flex-shrink-0 cursor-pointer"
                style={{ zIndex }}
                initial={{
                  transform: 'perspective(5000px) rotateY(-45deg) translateY(200px)',
                  opacity: 0,
                }}
                animate={{
                  transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onImageClick?.(index, image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick?.(index, image);
                  }
                }}
                aria-label={image.title ?? image.alt}
              >
                <div
                  className="relative aspect-video w-56 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 md:w-72 lg:w-80"
                  style={{ boxShadow: cardShadow }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover object-left-top"
                    loading="lazy"
                    decoding="async"
                  />
                  {image.title && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                      <p className="text-left text-sm font-semibold text-white">{image.title}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative block pb-6 pt-4 md:hidden">
        <div className="group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] flex-row">
          {Array.from({ length: marqueeRepeat }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row',
                pauseOnHover && 'group-hover:[animation-play-state:paused]'
              )}
            >
              {images.map((image, index) => (
                <div
                  key={`${i}-${image.src}-${index}`}
                  className="group flex-shrink-0 cursor-pointer"
                  onClick={() => onImageClick?.(index, image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onImageClick?.(index, image);
                    }
                  }}
                  aria-label={image.title ?? image.alt}
                >
                  <div
                    className="relative aspect-video w-64 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ boxShadow: cardShadow }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-left-top"
                      loading="lazy"
                      decoding="async"
                    />
                    {image.title && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                        <p className="text-left text-xs font-semibold text-white">{image.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  if (isSection) {
    return (
      <section
        aria-label={title}
        id="projects"
        className={cn('marketing-section overflow-hidden bg-muted/30', className)}
      >
        <div className="marketing-container">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
            <p className="marketing-eyebrow">Our Work</p>
            <h2 className="marketing-heading mt-3">{title}</h2>
            {subtitle && <p className="marketing-subtitle mt-4">{subtitle}</p>}
            <div className="mt-6 flex justify-center">{renderArchiveLink()}</div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <p className="hidden border-b border-border/60 px-6 py-3 text-center text-sm text-muted-foreground md:block">
              Click a project to open its dashboard preview
            </p>
            {galleryCards}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label={title} id="projects" className={cn('relative px-4 py-20', className)}>
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm">
        <div className="relative z-10 px-8 pb-4 pt-16 text-center">
          <h2 className="mb-8 text-balance font-poppins text-4xl font-bold text-foreground md:text-6xl">{title}</h2>
          {subtitle && <p className="marketing-subtitle mx-auto mb-8 max-w-2xl">{subtitle}</p>}
          {renderArchiveLink()}
        </div>
        {galleryCards}
        <div className="hidden h-48 md:block" aria-hidden />
      </div>
    </section>
  );
}
