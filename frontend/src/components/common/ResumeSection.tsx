'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { Button } from '../ui/Button'

export function ResumeSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="resume-cta"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="resume-cta-content">
        <h3 className="resume-cta-title">Resume</h3>
        <p className="resume-cta-description">
          A resume file has not been added yet. This section is ready to connect to the verified document when it is available.
        </p>

        <div className="resume-cta-actions">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Button
              variant="primary"
              disabled
              title="Resume file coming soon"
              className="resume-action-btn"
            >
              <Eye size={16} />
              View Resume
            </Button>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Button
              variant="secondary"
              disabled
              title="Resume file coming soon"
              className="resume-action-btn"
            >
              <Download size={16} />
              Download Resume
            </Button>
          </motion.div>
        </div>

        <p className="resume-cta-note">Resume file will be available soon</p>
      </div>
    </motion.div>
  )
}
