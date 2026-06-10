import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { AlignVisual } from '@/components/marketing/illustrations/AlignVisual';
import { whatWeDo } from '@/lib/marketing/content';

export function WhatWeDoSection() {
  return (
    <section className="marketing-section align-band-peach">
      <div className="marketing-container px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader eyebrow="What We Do" title={whatWeDo.headline} subtitle={whatWeDo.body} align="left" />
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AlignVisual visual="consultant" className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
