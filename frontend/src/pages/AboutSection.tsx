import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '../components/common/Container'
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

            <h2 id="about-title">
              Building toward thoughtful Java backend development.
            </h2>

            <p>
              I&apos;m {profile.name}, an MCA student and {profile.role} focused
              on building practical backend systems with Java, Spring Boot,
              REST APIs, and database-driven application design.
            </p>

            <p>
              My development journey includes Core Java, JDBC, MySQL, layered
              architecture, Spring Data JPA, Spring Security, testing, and
              clean backend engineering through hands-on project work.
            </p>

            <motion.div
              className="about-cta"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink href="#projects" variant="secondary">
                Explore my projects
                <ArrowRight aria-hidden="true" size={16} />
              </ButtonLink>
            </motion.div>
          </motion.div>

          <LearningJourney />
        </div>
      </Container>
    </section>
  )
}