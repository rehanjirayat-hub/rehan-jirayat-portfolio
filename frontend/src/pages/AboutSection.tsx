import { AlertCircle, Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '../components/common/Container'
import { LearningJourney } from '../components/common/LearningJourney'
import { ButtonLink } from '../components/ui/Button'
import { useProfile } from '../hooks/useProfile'
import { useSiteContent } from '../hooks/useSiteContent'

export function AboutSection() {
  const { profile, isLoading, error } = useProfile()
  const { content } = useSiteContent()
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
            <p className="eyebrow">{content.aboutEyebrow}</p>

            <h2 id="about-title">
              {content.aboutHeading}
            </h2>

            <p>
              {content.aboutParagraphOne.replace('Mohammad Rehan Jirayat', profile.name).replace('Java Backend Developer', profile.role)}
            </p>

            <p>
              {content.aboutParagraphTwo}
            </p>

            <motion.div
              className="about-cta"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink href={content.aboutCtaUrl} variant="secondary">
                {content.aboutCtaLabel}
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