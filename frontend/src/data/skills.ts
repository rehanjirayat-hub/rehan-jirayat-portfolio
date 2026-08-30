import type { SkillCategory } from '../types/skills'

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Primary development focus',
    emphasis: 'primary',
    skills: ['Java', 'Spring Boot', 'Spring MVC', 'REST APIs', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'JWT'],
  },
  {
    id: 'core-java',
    title: 'Core Java',
    description: 'Programming foundations',
    emphasis: 'secondary',
    skills: ['OOP', 'Collections', 'Exception Handling', 'JDBC', 'Multithreading'],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Data persistence',
    emphasis: 'secondary',
    skills: ['MySQL', 'SQL'],
  },
  {
    id: 'testing',
    title: 'Testing',
    description: 'Quality and API testing',
    emphasis: 'supporting',
    skills: ['JUnit 5', 'Mockito', 'Postman'],
  },
  {
    id: 'tools',
    title: 'Build & Development Tools',
    description: 'Development workflow',
    emphasis: 'supporting',
    skills: ['Maven', 'Git', 'GitHub', 'IntelliJ IDEA', 'VS Code'],
  },
  {
    id: 'frontend',
    title: 'Supporting Frontend Technologies',
    description: 'Supporting web interface skills',
    emphasis: 'supporting',
    skills: ['React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
]
