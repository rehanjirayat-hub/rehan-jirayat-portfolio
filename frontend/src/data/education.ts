import type { Education, Certification } from '../types/education'

export const educationData: Education[] = [
  {
    id: 'mca-vtu',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Visvesvaraya Technological University (VTU)',
    location: 'Jnana Sangama, Belagavi, Karnataka, India',
    startYear: 2025,
    endYear: 2027,
    expectedEndYear: 2027,
    status: 'currently-pursuing',
    cgpa: 69,
    website: 'https://vtu.ac.in/',
  },
  {
    id: 'bca-bharatesh',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Bharatesh College of Computer Applications',
    university: 'Rani Channamma University (RCU)',
    location: 'Belagavi, Karnataka, India',
    startYear: 2022,
    endYear: 2025,
    status: 'completed',
    cgpa: 66,
    website: 'https://www.bharateshcollege.org/',
  },
]

export const certifications: Certification[] = []