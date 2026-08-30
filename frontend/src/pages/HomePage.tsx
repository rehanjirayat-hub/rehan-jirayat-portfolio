import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { BackendVisual } from '../components/common/BackendVisual'
import { SocialLinks } from '../components/common/SocialLinks'
import { Button, ButtonLink } from '../components/ui/Button'
import { profile } from '../data/profile'

export function HomePage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="eyebrow">JAVA {'\u2022'} SPRING BOOT {'\u2022'} BACKEND DEVELOPMENT</p>
          <h1 id="hero-title">Hi, I&apos;m {profile.name}.</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-description">{profile.heroStatement}</p>
          <p className="hero-location">{profile.location}</p>
          <div className="hero-actions">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink href="#projects">View Projects</ButtonLink>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <Button variant="secondary" disabled title="Resume will be available soon">
                Download Resume
              </Button>
            </motion.div>
          </div>
          <SocialLinks />
        </motion.div>
        <BackendVisual />
      </Container>
    </section>
  )
}
