import type { EducationHighlight, JourneyStep } from '../types/about'

export const journeySteps: JourneyStep[] = [
  { id: 'core-java', label: 'Core Java' },
  { id: 'oop-collections', label: 'OOP & Collections' },
  { id: 'jdbc-sql', label: 'JDBC & SQL' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'layered-architecture', label: 'Layered Architecture' },
  { id: 'testing', label: 'JUnit 5 & Testing' },
  { id: 'spring-boot', label: 'Spring Boot' },
  { id: 'rest-apis', label: 'REST APIs' },
  { id: 'security-data', label: 'Spring Security, JPA & Hibernate' },
]

export const educationHighlights: EducationHighlight[] = [
  {
    degree: 'MCA',
    institution: 'Visvesvaraya Technological University',
    period: '2025-2027',
    cgpa: '69 CGPA',
  },
  {
    degree: 'BCA',
    institution: 'Rani Channamma University',
    period: '2022-2025',
    cgpa: '66 CGPA',
  },
]
