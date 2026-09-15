export interface Experience {
  id?: number
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  displayOrder: number
  companyUrl?: string
  visible: boolean
}
