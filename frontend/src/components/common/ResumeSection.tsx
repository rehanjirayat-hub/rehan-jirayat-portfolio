'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { Button } from '../ui/Button'

const RESUME_PATH = '/resume/Mohammad_Rehan_Jirayat_Resume.pdf'
const RESUME_FILENAME = 'Mohammad_Rehan_Jirayat_Resume.pdf'

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
          Download or view my resume to learn more about my experience and skills.
        </p>

        <div className="resume-cta-actions">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                className="resume-action-btn"
              >
                <Eye size={16} />
                View Resume
              </Button>
            </a>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <a href={RESUME_PATH} download={RESUME_FILENAME}>
              <Button
                variant="secondary"
                className="resume-action-btn"
              >
                <Download size={16} />
                Download Resume
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
