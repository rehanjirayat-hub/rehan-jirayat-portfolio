export type SkillCategoryId = 'backend' | 'core-java' | 'database' | 'testing' | 'tools' | 'frontend'

export interface SkillCategory {
  id: SkillCategoryId
  title: string
  description: string
  skills: string[]
  emphasis: 'primary' | 'secondary' | 'supporting'
}
