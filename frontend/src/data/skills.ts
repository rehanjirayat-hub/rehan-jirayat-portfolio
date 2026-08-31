import type { SkillCategory } from '../types/skills'

export const skillCategories: SkillCategory[] = [
  {
    id: 'java-backend',
    title: 'Java & Backend',
    description: 'Core Java and backend application foundations',
    emphasis: 'primary',
    skills: ['Core Java', 'OOP', 'Collections', 'Exception Handling', 'Multithreading', 'DSA', 'JDBC', 'Servlets', 'JSP', 'REST APIs', 'Logging', 'Spring AI'],
  },
  {
    id: 'spring-ecosystem',
    title: 'Spring Ecosystem',
    description: 'Frameworks, APIs, and security for backend development',
    emphasis: 'primary',
    skills: ['Spring Framework', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'JWT', 'OAuth2'],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Persistent data and SQL fundamentals',
    emphasis: 'secondary',
    skills: ['MySQL', 'SQL'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Layered and service-oriented backend design',
    emphasis: 'secondary',
    skills: ['Layered Architecture', 'MVC (Model-View-Controller)', 'Microservices'],
  },
  {
    id: 'testing-tools',
    title: 'Testing & Development Tools',
    description: 'Build, test, and API validation workflows',
    emphasis: 'secondary',
    skills: ['Maven', 'Gradle', 'JUnit 5', 'Mockito', 'Git', 'GitHub', 'Postman'],
  },
  {
    id: 'ides',
    title: 'IDEs',
    description: 'Core development environments',
    emphasis: 'supporting',
    skills: ['IntelliJ IDEA', 'Eclipse', 'Visual Studio Code'],
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud',
    description: 'Deployment and operational support',
    emphasis: 'supporting',
    skills: ['Docker', 'Cloud Deployment', 'Linux', 'Ansible', 'Jenkins', 'Terraform'],
  },
  {
    id: 'frontend',
    title: 'Supporting Frontend',
    description: 'Supporting UI and web foundation technologies',
    emphasis: 'supporting',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
]
