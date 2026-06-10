import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { NetworkDashboardMockup, AishwaryaChatMockup } from '@/components/marketing/mockups/ProductMockups';
import { flagshipProducts } from '@/lib/marketing/content';

export function FlagshipProductsSection() {
  const network = flagshipProducts[0];
  const aishwarya = flagshipProducts[1];

  return (
    <section id="products" className="marketing-section scroll-mt-20">
      <div className="marketing-container px-6">
        <SectionHeader
          eyebrow="Flagship Products"
          title="The ALIGN ecosystem"
          subtitle="Two connected platforms that bring opportunities, people, and intelligent systems together."
        />

        <div className="mt-14 space-y-16 lg:space-y-24">
          {network && (
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="linear-heading-lg text-2xl sm:text-3xl">{network.title}</h3>
                <p className="linear-body-lg mt-3">{network.subtitle}</p>
                <p className="mt-4 text-sm font-[510] uppercase tracking-wider text-[#62666d]">Connects</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {network.connects?.map((item) => (
                    <span key={item} className="linear-status-pill border border-[#23252a] bg-[#161718]">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="linear-card overflow-hidden p-2">
                  <NetworkDashboardMockup className="h-auto w-full rounded-md" />
                </div>
              </motion.div>
            </div>
          )}

          {aishwarya && (
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="linear-card overflow-hidden p-2">
                  <AishwaryaChatMockup className="h-auto w-full rounded-md" />
                </div>
              </motion.div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="linear-heading-lg text-2xl sm:text-3xl">{aishwarya.title}</h3>
                <p className="linear-body-lg mt-3">{aishwarya.subtitle}</p>
                <p className="mt-4 text-sm font-[510] uppercase tracking-wider text-[#62666d]">Capabilities</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {aishwarya.capabilities?.map((cap) => (
                    <li key={cap} className="text-sm text-[#d0d6e0] before:mr-2 before:text-[#5e6ad2] before:content-['·']">
                      {cap}
                    </li>
                  ))}
                </ul>
                {aishwarya.example && (
                  <div className="linear-card-deep mt-6 p-4 text-sm">
                    <p className="text-[#8a8f98]">
                      <span className="font-[510] text-[#f7f8f8]">You:</span> {aishwarya.example.user}
                    </p>
                    <p className="mt-2 text-[#8a8f98]">
                      <span className="font-[510] text-[#5e6ad2]">{aishwarya.title}:</span>{' '}
                      {aishwarya.example.assistant}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
