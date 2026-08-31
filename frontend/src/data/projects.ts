import type { Project } from '../types/projects'

export const projects: Project[] = [
  {
    id: 'foodflow-backend',
    name: 'FoodFlow Backend',
    description:
      'A completed console-based food delivery backend system built with Core Java, JDBC, MySQL, Maven, JUnit 5, and Layered Architecture.',
    status: 'completed',
    technologies: [
      { name: 'Core Java', category: 'language' },
      { name: 'JDBC', category: 'framework' },
      { name: 'MySQL', category: 'database' },
      { name: 'Maven', category: 'tool' },
      { name: 'JUnit 5', category: 'testing' },
      { name: 'Layered Architecture', category: 'architecture' },
    ],
    githubUrl: 'https://github.com/rehanjirayat-hub/foodflow-backend',
    overview:
      'A console-based food delivery backend system developed with the listed Java, database, testing, and architecture technologies.',
    architecture: 'Layered Architecture.',
    testing: 'JUnit 5 is included in the project technology stack.',
  },
  {
    id: 'employee-payroll-system',
    name: 'Employee Management & Payroll System',
    description:
      'A completed Java console-based employee management and payroll system built with Java 21, OOP, Collections, JDBC, MySQL, Maven, JUnit 5, Git/GitHub, and Layered Architecture.',
    status: 'completed',
    technologies: [
      { name: 'Java 21', category: 'language' },
      { name: 'OOP', category: 'architecture' },
      { name: 'Collections', category: 'framework' },
      { name: 'JDBC', category: 'framework' },
      { name: 'MySQL', category: 'database' },
      { name: 'Maven', category: 'tool' },
      { name: 'JUnit 5', category: 'testing' },
      { name: 'Git/GitHub', category: 'tool' },
      { name: 'Layered Architecture', category: 'architecture' },
    ],
    githubUrl: 'https://github.com/rehanjirayat-hub/employee-payroll-system',
    overview:
      'A Java console-based system for employee management and payroll, using the listed Core Java, JDBC, database, testing, and development technologies.',
    architecture: 'Layered Architecture.',
    testing: 'JUnit 5 integration tests are documented in the repository.',
  },
]
