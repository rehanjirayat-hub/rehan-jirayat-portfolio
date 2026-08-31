'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { ResumeSection } from '../components/common/ResumeSection'
import { ContactForm } from '../components/common/ContactForm'
import { ContactDetails } from '../components/common/ContactDetails'

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      {/* Resume Section */}
      <section id="resume" className="resume-section" aria-labelledby="resume-heading">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              eyebrow="DOCUMENT"
              title="Resume"
              description="A resume file will be connected here when the verified document is available."
              titleId="resume-heading"
            />
          </motion.div>

          <ResumeSection />
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SectionHeading
              eyebrow="GET IN TOUCH"
              title="Contact"
              description="Use the form to prepare a message. Backend delivery will be connected in a later step."
              titleId="contact-heading"
            />
          </motion.div>

          <div className="contact-layout">
            <ContactDetails />
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
