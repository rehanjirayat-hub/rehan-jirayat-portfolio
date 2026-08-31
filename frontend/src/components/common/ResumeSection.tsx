'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { ButtonLink } from '../ui/Button'

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
            <ButtonLink
              variant="primary"
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-action-btn"
            >
              <Eye size={16} aria-hidden="true" />
              View Resume
            </ButtonLink>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <ButtonLink
              variant="secondary"
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="resume-action-btn"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
