import type { Project } from '../types/projects'

export const projects: Project[] = [
  {
    id: 'foodflow-backend',
    name: 'FoodFlow Backend',
    description:
      'A console-based Food Delivery Backend System developed using Core Java, JDBC, MySQL, Maven, JUnit 5, and layered architecture.',
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
      'FoodFlow Backend is a console-based food delivery system demonstrating core Java development principles. It implements a complete backend solution for managing food delivery operations using JDBC for database interactions and MySQL for persistence.',
    architecture:
      'The system follows a layered architecture pattern with clear separation of concerns: presentation layer (console interface), business logic layer (service classes), and data access layer (DAO pattern with JDBC). This design ensures maintainability and testability.',
    capabilities: [
      'User and restaurant management',
      'Order processing and tracking',
      'Menu management',
      'Delivery management',
      'Payment processing',
      'Console-based user interface',
    ],
    testing:
      'Comprehensive test coverage using JUnit 5 with multiple test classes covering business logic, data access, and integration scenarios.',
    visual: {
      gradient: 'from-blue-900/40 to-cyan-900/20',
    },
  },
  {
    id: 'employee-payroll-system',
    name: 'Employee Management & Payroll System',
    description:
      'An Employee Management and Payroll System built using Java 21, OOP, Collections, JDBC, MySQL, Maven, JUnit 5, and Git/GitHub following a layered architecture.',
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
      'A complete Employee Management and Payroll System that demonstrates advanced Java development practices. Built with Java 21, it showcases object-oriented design, collection frameworks, and database integration through JDBC. The system manages employee information and calculates payroll.',
    architecture:
      'Implements a robust layered architecture with presentation layer (command-line interface), service layer (business logic for payroll calculations, employee management), and data access layer (JDBC-based persistence). Uses design patterns like DAO, Service Locator, and Factory patterns.',
    capabilities: [
      'Employee data management',
      'Payroll calculation and processing',
      'Salary and deduction management',
      'Employee search and filtering',
      'Report generation',
      'Data persistence with MySQL',
    ],
    testing:
      'Thorough test suite using JUnit 5 covering employee operations, payroll calculations, data validation, and persistence logic.',
    visual: {
      gradient: 'from-green-900/40 to-emerald-900/20',
    },
  },
]
