import { AlertCircle, Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { BackendVisual } from '../components/common/BackendVisual'
import { SocialLinks } from '../components/common/SocialLinks'
import { ButtonLink } from '../components/ui/Button'
import { useProfile } from '../hooks/useProfile'
import { useSiteContent } from '../hooks/useSiteContent'

const RESUME_FILENAME = 'Mohammad_Rehan_Jirayat_Resume.pdf'

export function HomePage() {
  const { profile, isLoading, error } = useProfile()
  const { content } = useSiteContent()
  const shouldReduceMotion = useReducedMotion()

  if (isLoading) {
    return (
      <section id="home" className="hero-section" aria-labelledby="hero-title">
        <Container className="hero-grid" style={{ justifyItems: 'center', textAlign: 'center' }}>
          <div className="hero-copy" style={{ maxWidth: '40rem' }}>
            <div className="projects-status" role="status">
              <Loader2 size={24} className="projects-spinner" aria-hidden="true" />
              <p>Loading profile…</p>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  if (error || !profile) {
    return (
      <section id="home" className="hero-section" aria-labelledby="hero-title">
        <Container className="hero-grid" style={{ justifyItems: 'center', textAlign: 'center' }}>
          <div className="hero-copy" style={{ maxWidth: '40rem' }}>
            <div className="projects-status projects-error" role="alert">
              <AlertCircle size={24} aria-hidden="true" />
              <p>Unable to load profile information. Please try refreshing the page.</p>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="eyebrow">{content.heroSubtitle || profile.specialization}</p>
          <h1 id="hero-title">Hi, I&apos;m {profile.name}.</h1>
          <p className="hero-role">{content.professionalTitle || profile.role}</p>
          <p className="hero-description">{profile.heroStatement}</p>
          <p className="hero-location">{profile.location}</p>
          <div className="hero-actions">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink href={content.heroPrimaryCtaUrl}>{content.heroPrimaryCtaLabel}</ButtonLink>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink variant="secondary" href={content.heroSecondaryCtaUrl} download={content.heroSecondaryCtaUrl.endsWith('.pdf') ? RESUME_FILENAME : undefined}>
                {content.heroSecondaryCtaLabel}
              </ButtonLink>
            </motion.div>
          </div>
          <SocialLinks />
        </motion.div>
        <BackendVisual />
      </Container>
    </section>
  )
}
