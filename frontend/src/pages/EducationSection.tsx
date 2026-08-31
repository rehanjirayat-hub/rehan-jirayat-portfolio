'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { EducationCard } from '../components/common/EducationCard'
import { CertificationsSection } from '../components/common/CertificationsSection'
import { useEducation } from '../hooks/useEducation'

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion()
  const { education: educationData, isLoading, error } = useEducation()

  return (
    <section id="education" className="education-section" aria-labelledby="education-heading">
      <Container>
        {/* Education Timeline */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeading
            eyebrow="ACADEMIC JOURNEY"
            title="Education"
            description="Building a strong foundation in computer science and applications development."
            titleId="education-heading"
          />
        </motion.div>

        {isLoading && (
          <div className="education-status" role="status">
            <Loader2 size={24} className="education-spinner" aria-hidden="true" />
            <p>Loading education...</p>
          </div>
        )}

        {error && (
          <div className="education-status education-error" role="alert">
            <AlertCircle size={24} aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && educationData.length === 0 && (
          <div className="education-empty" role="status">
            <p>No education records found.</p>
          </div>
        )}

        {!isLoading && !error && educationData.length > 0 && (
          <div className="education-timeline">
            {[...educationData]
              .sort((a, b) => {
                if (a.status === b.status) return 0
                return a.status === 'currently-pursuing' ? -1 : 1
              })
              .map((education, index) => (
                <EducationCard
                  key={education.id}
                  education={education}
                  index={index}
                  isLatest={index === 0}
                />
              ))}
          </div>
        )}
      </Container>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section-wrapper" aria-labelledby="certifications-heading">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              eyebrow="CREDENTIALS"
              title="Certifications"
              description="Verified certifications will appear here when available."
              titleId="certifications-heading"
            />
          </motion.div>

          <CertificationsSection />
        </Container>
      </section>
    </section>
  )
}
