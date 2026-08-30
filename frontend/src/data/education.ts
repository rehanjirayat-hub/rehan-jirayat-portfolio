import type { Education, Certification } from '../types/education'

export const educationData: Education[] = [
  {
    id: 'mca-vtu',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Visvesvaraya Technological University',
    location: 'Belagavi, Karnataka, India',
    startYear: 2025,
    expectedEndYear: 2027,
    status: 'currently-pursuing',
    cgpa: 69,
  },
  {
    id: 'bca-rcub',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Rani Channamma University',
    location: 'Belagavi, Karnataka, India',
    startYear: 2022,
    endYear: 2025,
    status: 'completed',
    cgpa: 66,
  },
]

export const certifications: Certification[] = []
