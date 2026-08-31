export type SkillCategoryId =
  | 'java-backend'
  | 'spring-ecosystem'
  | 'database'
  | 'architecture'
  | 'testing-tools'
  | 'ides'
  | 'devops-cloud'
  | 'frontend'

export interface SkillCategory {
  id: SkillCategoryId
  title: string
  description: string
  skills: string[]
  emphasis: 'primary' | 'secondary' | 'supporting'
}
