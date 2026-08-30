export type EducationStatus = 'completed' | 'currently-pursuing'

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startYear: number
  endYear: number
  expectedEndYear?: number
  status: EducationStatus
  cgpa: number
}

export interface Certification {
  id: string
  name: string
  organization: string
  issueDate: string
  credentialUrl?: string
  credentialId?: string
}
