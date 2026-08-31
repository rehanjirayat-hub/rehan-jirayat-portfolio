import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../components/common/Container'
import { SectionHeading } from '../components/common/SectionHeading'
import { SkillCategoryCard } from '../components/common/SkillCategoryCard'
import { skillCategories } from '../data/skills'

export function SkillsSection() {
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
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard category={category} index={index} key={category.id} />
          ))}
        </div>
      </Container>
    </section>
  )
}
