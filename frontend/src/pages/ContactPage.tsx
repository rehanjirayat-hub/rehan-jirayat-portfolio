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
              eyebrow="PROFESSIONAL DOCUMENT"
              title="Resume"
              description="Download or view my complete professional resume highlighting experience, skills, and achievements in Java backend development."
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
              title="Let's Connect"
              description="Have an opportunity, want to collaborate, or just want to chat about backend development? I'd love to hear from you."
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
