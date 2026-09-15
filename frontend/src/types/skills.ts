export type SkillCategoryId = string

export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: string[]

  emphasis: 'primary' | 'secondary' | 'supporting'
  visible?: boolean
  displayOrder?: number
}
