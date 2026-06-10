import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { CartoonEcosystem } from '@/components/marketing/illustrations/CartoonIllustrations';
import { whatWeDo } from '@/lib/marketing/content';

export function WhatWeDoSection() {
  return (
    <section className="marketing-section bg-background">
      <div className="marketing-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              eyebrow="What We Do"
              title={whatWeDo.headline}
              subtitle={whatWeDo.body}
              align="left"
            />
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="pastel-card-sky w-full max-w-sm rounded-3xl p-6 sm:max-w-md sm:p-8">
              <CartoonEcosystem className="mx-auto h-auto w-full max-w-[280px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
