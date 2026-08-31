import { motion, useReducedMotion } from 'framer-motion'
import { CloudCog, Code2, Database, Layers3, PanelTop, ServerCog, ShieldCheck, TestTube2 } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import type { SkillCategory, SkillCategoryId } from '../../types/skills'

const categoryIcons: Record<SkillCategoryId, typeof ServerCog> = {
  'java-backend': ServerCog,
  'spring-ecosystem': ShieldCheck,
  database: Database,
  architecture: Layers3,
  'testing-tools': TestTube2,
  ides: Code2,
  'devops-cloud': CloudCog,
  frontend: PanelTop,
}

interface SkillCategoryCardProps {
  category: SkillCategory
  index: number
}

export function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = categoryIcons[category.id]

  return (
    <motion.div
      className={`skills-card-wrapper skills-card-${category.emphasis}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.34, delay: shouldReduceMotion ? 0 : index * 0.05, ease: 'easeOut' }}
    >
      <Card className="skills-card">
        <div className="skills-card-header">
          <span className="skills-card-icon" aria-hidden="true">
            <Icon size={19} />
          </span>
          <div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        </div>
        <ul className="skill-list" aria-label={`${category.title} skills`}>
          {category.skills.map((skill) => (
            <li key={skill}>
              <Badge>{skill}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
