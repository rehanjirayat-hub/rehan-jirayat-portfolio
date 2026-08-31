'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function CertificationsSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="certifications-content">
      <motion.div
        className="certifications-empty-state"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="certifications-empty-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 6H40C41.1046 6 42 6.89543 42 8V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V8C6 6.89543 6.89543 6 8 6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M6 12H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M24 22L32 18M24 22L32 26M24 22L16 18M24 22L16 26"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="24"
              cy="32"
              r="2"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="certifications-empty-title">No certifications added yet.</h3>
        <p className="certifications-empty-message">
          This section is ready for verified certifications when they are available.
        </p>
      </motion.div>
    </section>
  )
}
