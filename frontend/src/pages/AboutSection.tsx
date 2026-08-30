import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '../components/common/Container'
import { EducationPreview } from '../components/common/EducationPreview'
import { LearningJourney } from '../components/common/LearningJourney'
import { ButtonLink } from '../components/ui/Button'
import { profile } from '../data/profile'

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <Container>
        <div className="about-grid">
          <motion.div
            className="about-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="eyebrow">About</p>
            <h2 id="about-title">Building toward thoughtful Java backend development.</h2>
            <p>
              I&apos;m {profile.name}, an MCA student focused on becoming a {profile.role}. My development journey
              began with Core Java and object-oriented programming, then grew through JDBC, MySQL, layered
              architecture, testing, and backend application development.
            </p>
            <p>
              I&apos;m now developing practical backend projects while building skills in Spring Boot, REST APIs, Spring
              Data JPA, Spring Security, databases, testing, and clean architecture through hands-on development.
            </p>
            <motion.div
              className="about-cta"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink href="#projects" variant="secondary">
                Explore my projects <ArrowRight aria-hidden="true" size={16} />
              </ButtonLink>
            </motion.div>
          </motion.div>
          <LearningJourney />
        </div>
        <EducationPreview />
      </Container>
    </section>
  )
}
