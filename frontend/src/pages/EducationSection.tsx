'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { EducationCard } from '../components/common/EducationCard'
import { CertificationsSection } from '../components/common/CertificationsSection'
import { educationData } from '../data/education'

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion()

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

        <div className="education-timeline">
          {educationData.map((education, index) => (
            <EducationCard
              key={education.id}
              education={education}
              index={index}
              isLatest={index === 0}
            />
          ))}
        </div>
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
