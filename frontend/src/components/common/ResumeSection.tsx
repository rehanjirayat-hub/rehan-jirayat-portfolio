'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { http } from '../../services/http'
import type { PublicResume } from '../../types/media'

const RESUME_PATH = '/resume/Mohammad_Rehan_Jirayat_Resume.pdf'
const RESUME_FILENAME = 'Mohammad_Rehan_Jirayat_Resume.pdf'

export function ResumeSection() {
  const shouldReduceMotion = useReducedMotion()
  const [resumeUrl, setResumeUrl] = useState<string>(RESUME_PATH)
  const [resumeFilename, setResumeFilename] = useState<string>(RESUME_FILENAME)

  useEffect(() => {
    let active = true
    http
      .get<PublicResume>('/api/resume')
      .then((response) => {
        if (!active) return
        if (response.data.hasResume && response.data.url) {
          setResumeUrl(response.data.url)
          setResumeFilename(response.data.originalFilename ?? RESUME_FILENAME)
        }
      })
      .catch(() => {
        // Keep the bundled static resume as the fallback.
      })
    return () => {
      active = false
    }
  }, [])

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
              href={resumeUrl}
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
              href={resumeUrl}
              download={resumeFilename}
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
