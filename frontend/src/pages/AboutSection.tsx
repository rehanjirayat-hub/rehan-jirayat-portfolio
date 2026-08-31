import { AlertCircle, Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '../components/common/Container'
import { LearningJourney } from '../components/common/LearningJourney'
import { ButtonLink } from '../components/ui/Button'
import { useProfile } from '../hooks/useProfile'

export function AboutSection() {
  const { profile, isLoading, error } = useProfile()
  const shouldReduceMotion = useReducedMotion()

  if (isLoading) {
    return (
      <section id="about" className="about-section" aria-labelledby="about-title">
        <Container>
          <div className="about-grid">
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <div className="projects-status" role="status">
                <Loader2 size={24} className="projects-spinner" aria-hidden="true" />
                <p>Loading profile…</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  if (error || !profile) {
    return (
      <section id="about" className="about-section" aria-labelledby="about-title">
        <Container>
          <div className="about-grid">
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <div className="projects-status projects-error" role="alert">
                <AlertCircle size={24} aria-hidden="true" />
                <p>Unable to load profile information. Please try refreshing the page.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

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