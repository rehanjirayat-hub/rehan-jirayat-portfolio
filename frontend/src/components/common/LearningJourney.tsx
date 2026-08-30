import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { journeySteps } from '../../data/about'

export function LearningJourney() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="journey-panel">
      <div className="journey-panel-header">
        <span className="status-dot" aria-hidden="true" />
        <p>learning progression</p>
      </div>
      <ol className="journey-list" aria-label="Backend development learning progression">
        {journeySteps.map((step, index) => (
          <motion.li
            className="journey-step"
            key={step.id}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.32, delay: shouldReduceMotion ? 0 : index * 0.04, ease: 'easeOut' }}
          >
            <span className="journey-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{step.label}</span>
            {index < journeySteps.length - 1 ? <ArrowDown className="journey-arrow" aria-hidden="true" size={15} /> : null}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
