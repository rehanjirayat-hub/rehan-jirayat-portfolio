import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { SkillCategoryCard } from '../components/common/SkillCategoryCard'
import { useSkills } from '../hooks/useSkills'

export function SkillsSection() {
  const { skills, isLoading, error } = useSkills()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <Container>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Java Backend Developer with Spring Boot and API-first backend strengths."
            description="My primary direction is Java backend development, centred on Spring Boot, REST APIs, JPA/Hibernate, Spring Security, and MySQL-backed application design."
            titleId="skills-title"
          />
        </motion.div>

        {isLoading && (
          <div className="projects-status" role="status">
            <Loader2 size={24} className="projects-spinner" aria-hidden="true" />
            <p>Loading skills...</p>
          </div>
        )}

        {error && (
          <div className="projects-status projects-error" role="alert">
            <AlertCircle size={24} aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="skills-grid">
            {skills.map((category, index) => (
              <SkillCategoryCard category={category} index={index} key={category.id} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
