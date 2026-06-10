import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { NetworkDashboardMockup, AishwaryaChatMockup } from '@/components/marketing/mockups/ProductMockups';
import { CartoonRobot } from '@/components/marketing/illustrations/CartoonIllustrations';
import { flagshipProducts } from '@/lib/marketing/content';

export function FlagshipProductsSection() {
  const network = flagshipProducts[0];
  const aishwarya = flagshipProducts[1];

  return (
    <section id="products" className="marketing-section scroll-mt-20">
      <div className="marketing-container">
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
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-poppins text-2xl font-bold sm:text-3xl">{network.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{network.subtitle}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connects</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {network.connects?.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/[0.06]"
              >
                <NetworkDashboardMockup className="h-auto w-full" />
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
                transition={{ duration: 0.5 }}
              >
                <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/[0.06]">
                  <AishwaryaChatMockup className="h-auto w-full" />
                </div>
              </motion.div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="pastel-card-lavender mb-6 hidden w-32 rounded-2xl p-3 sm:block">
                  <CartoonRobot className="h-auto w-full" />
                </div>
                <h3 className="font-poppins text-2xl font-bold sm:text-3xl">{aishwarya.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{aishwarya.subtitle}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Capabilities</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {aishwarya.capabilities?.map((cap) => (
                    <li key={cap} className="text-sm text-foreground/85 before:mr-2 before:content-['·']">
                      {cap}
                    </li>
                  ))}
                </ul>
                {aishwarya.example && (
                  <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">You:</span> {aishwarya.example.user}
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      <span className="font-semibold text-primary">{aishwarya.title}:</span> {aishwarya.example.assistant}
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
