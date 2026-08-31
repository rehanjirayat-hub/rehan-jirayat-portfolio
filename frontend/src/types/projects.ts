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
}

export type ProjectId = string
