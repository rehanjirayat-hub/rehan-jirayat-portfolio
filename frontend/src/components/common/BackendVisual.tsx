import { motion, useReducedMotion } from 'framer-motion'
import { Database, LockKeyhole, ServerCog } from 'lucide-react'

const visualItems = [
  { label: 'Java', icon: ServerCog },
  { label: 'Spring Boot', icon: LockKeyhole },
  { label: 'Data', icon: Database },
]

export function BackendVisual() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="hero-visual"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
    >
      <div className="backend-visual" aria-label="Java and Spring Boot backend development">
        <div className="backend-visual-topline">
          <span className="status-dot" aria-hidden="true" />
          <span>backend-system</span>
        </div>
        <div className="backend-core">
          <span className="backend-core-mark">&lt;/&gt;</span>
          <span>service layer</span>
        </div>
        <div className="backend-connections" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="backend-node-grid">
          {visualItems.map(({ label, icon: Icon }, index) => (
            <motion.div
              className="backend-node"
              key={label}
              animate={shouldReduceMotion ? undefined : { y: [0, index === 1 ? -4 : -2, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 3.4 + index * 0.35,
                      delay: index * 0.18,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'mirror',
                    }
              }
            >
              <Icon aria-hidden="true" size={17} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
