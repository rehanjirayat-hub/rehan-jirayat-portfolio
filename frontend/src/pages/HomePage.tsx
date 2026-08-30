import { motion } from 'framer-motion'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { Container } from '../components/common/Container'

const focusAreas = ['Java', 'Spring Boot', 'Backend Engineering']

export function HomePage() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <Container className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="eyebrow">Portfolio</p>
          <h1 id="hero-title">Mohammad Rehan Jirayat</h1>
          <p className="hero-role">Java Spring Boot Developer</p>
          <div className="hero-tags" aria-label="Professional focus">
            {focusAreas.map((area) => (
              <Badge key={area}>{area}</Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <Card className="architecture-card">
            <div className="architecture-card-header">
              <span className="status-dot" />
              <span>backend</span>
            </div>
            <div className="architecture-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="architecture-grid">
              <span />
              <span />
              <span />
              <span />
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}
