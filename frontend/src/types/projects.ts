export interface ProjectTechnology {
  name: string
  category?: 'language' | 'framework' | 'database' | 'testing' | 'tool' | 'architecture'
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
  technologies: ProjectTechnology[]
  githubUrl: string
  overview: string
  architecture: string
  testing: string
  imageUrl?: string
  visible?: boolean
  displayOrder?: number
}

export type ProjectId = string
