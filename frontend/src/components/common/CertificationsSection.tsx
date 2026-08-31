'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { fetchCertifications } from '../../services/certifications'
import type { Certification } from '../../types/education'

export function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    fetchCertifications()
      .then(setCertifications)
      .catch(() => setError('Failed to load certifications. Please try again later.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <section className="certifications-content">
        <div className="certifications-status" role="status">
          <Loader2 size={24} className="certifications-spinner" aria-hidden="true" />
          <p>Loading certifications...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="certifications-content">
        <div className="certifications-status certifications-error" role="alert">
          <AlertCircle size={24} aria-hidden="true" />
          <p>{error}</p>
        </div>
      </section>
    )
  }

  if (certifications.length === 0) {
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

  return (
    <section className="certifications-content">
      <div className="certifications-list">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="certification-card"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="certification-card-header">
              <h3 className="certification-name">{cert.name}</h3>
              {cert.date && <span className="certification-date">{cert.date}</span>}
            </div>
            <p className="certification-organization">{cert.organization}</p>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-link"
                aria-label={`View credential for ${cert.name}`}
              >
                View Credential
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
