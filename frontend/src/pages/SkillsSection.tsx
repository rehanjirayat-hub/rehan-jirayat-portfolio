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
            title="Java backend development, supported by practical foundations."
            description="My primary direction is Java and Spring Boot backend development, built on Core Java, database, testing, and development-tool foundations."
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
