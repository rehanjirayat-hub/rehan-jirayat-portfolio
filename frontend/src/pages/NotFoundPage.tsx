import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { ButtonLink } from '../components/ui/Button'

export function NotFoundPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="hero-section" aria-labelledby="not-found-title">
      <Container className="hero-grid" style={{ justifyItems: 'center', textAlign: 'center' }}>
        <motion.div
          className="hero-copy"
          style={{ maxWidth: '40rem' }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="eyebrow">Error</p>
          <h1 id="not-found-title">404 — Page Not Found</h1>
          <p className="hero-role">The page you're looking for doesn't exist.</p>
          <p className="hero-description">
            It may have been moved, renamed, or the URL might be incorrect.
            Let's get you back on track.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <ButtonLink href="/">Back to Home</ButtonLink>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
