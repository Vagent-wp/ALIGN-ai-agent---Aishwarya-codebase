import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import type { NetworkShowcaseItem } from '@/lib/marketing/invisibleContent';

const ORBIT_NODES = [
  { angle: -58, label: '1' },
  { angle: 62, label: '2' },
  { angle: 178, label: '3' },
] as const;

interface NetworkMatchPulseProps {
  item: NetworkShowcaseItem;
}

/** Live ecosystem radar — syncs with the active network query */
export function NetworkMatchPulse({ item }: NetworkMatchPulseProps) {
  return (
    <motion.aside
      key={item.id}
      initial={{ opacity: 0, x: 12, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 8, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="inv-network-pulse h-full"
      aria-label="AI match intelligence"
    >
      <div className="inv-network-pulse__header">
        <span className="inv-network-pulse__badge">
          <Sparkles size={11} strokeWidth={2} aria-hidden />
          Match intelligence
        </span>
        <span className="inv-network-pulse__live">
          <span className="inv-network-pulse__live-dot" aria-hidden />
          Live
        </span>
      </div>

      <div className="inv-network-pulse__radar" aria-hidden>
        <svg viewBox="0 0 200 200" className="inv-network-pulse__svg">
          <circle cx="100" cy="100" r="78" className="inv-network-pulse__ring inv-network-pulse__ring--outer" />
          <circle cx="100" cy="100" r="52" className="inv-network-pulse__ring" />
          <circle cx="100" cy="100" r="26" className="inv-network-pulse__ring inv-network-pulse__ring--inner" />
          <line x1="100" y1="100" x2="100" y2="22" className="inv-network-pulse__sweep" />
          {ORBIT_NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 68;
            const y = 100 + Math.sin(rad) * 68;
            return (
              <g key={node.label}>
                <line x1="100" y1="100" x2={x} y2={y} className="inv-network-pulse__spoke" />
                <circle cx={x} cy={y} r="9" className="inv-network-pulse__node" />
                <text x={x} y={y + 3.5} textAnchor="middle" className="inv-network-pulse__node-label">
                  {node.label}
                </text>
              </g>
            );
          })}
          <circle cx="100" cy="100" r="14" className="inv-network-pulse__hub" />
        </svg>

        <div className="inv-network-pulse__score">
          <motion.span
            key={item.matchScore}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inv-network-pulse__score-value"
          >
            {item.matchScore}%
          </motion.span>
          <span className="inv-network-pulse__score-label">relevance</span>
        </div>
      </div>

      <div className="inv-network-pulse__stats">
        <div>
          <p className="inv-network-pulse__stat-value">{item.scanTime}</p>
          <p className="inv-network-pulse__stat-label">Scan time</p>
        </div>
        <div>
          <p className="inv-network-pulse__stat-value">{item.nodesScanned}</p>
          <p className="inv-network-pulse__stat-label">Nodes scanned</p>
        </div>
        <div>
          <p className="inv-network-pulse__stat-value">{item.results.length}</p>
          <p className="inv-network-pulse__stat-label">Top matches</p>
        </div>
      </div>

      <div className="inv-network-pulse__signals">
        <p className="inv-network-pulse__signals-label">
          <Zap size={11} strokeWidth={2} aria-hidden />
          Intent parsed
        </p>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inv-network-pulse__chips"
          >
            {item.signals.map((signal, i) => (
              <motion.span
                key={signal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="inv-network-pulse__chip"
              >
                {signal}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
