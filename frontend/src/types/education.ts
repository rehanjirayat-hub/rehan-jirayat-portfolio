export type EducationStatus = 'currently-pursuing' | 'completed'

export interface Education {
  id: string
  degree: string
  institution: string
  university?: string
  location: string
  startYear: number
  endYear: number
  expectedEndYear?: number
  status: EducationStatus
  cgpa: number
  website?: string
}

export interface Certification {
  id: string
  name: string
  organization: string
  date?: string
  credentialUrl?: string
}