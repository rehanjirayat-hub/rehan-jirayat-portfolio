package com.rehanjirayat.portfolio.config;

import com.rehanjirayat.portfolio.domain.*;
import com.rehanjirayat.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;
    private final ProfileRepository profileRepository;
    private final SkillCategoryRepository skillCategoryRepository;
    private final EducationRepository educationRepository;

    public DataSeeder(ProjectRepository projectRepository,
                     CertificationRepository certificationRepository,
                     ProfileRepository profileRepository,
                     SkillCategoryRepository skillCategoryRepository,
                     EducationRepository educationRepository) {
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
        this.profileRepository = profileRepository;
        this.skillCategoryRepository = skillCategoryRepository;
        this.educationRepository = educationRepository;
    }

    @Override
    public void run(String... args) {
        if (projectRepository.count() == 0) {
            seedProjects();
            log.info("Seed data loaded: {} projects", projectRepository.count());
        } else {
            log.info("Projects table already has {} rows — skipping seed", projectRepository.count());
        }

        if (certificationRepository.count() == 0) {
            log.info("Certifications table is empty — no seed data available");
        } else {
            log.info("Certifications table already has {} rows — skipping seed", certificationRepository.count());
        }

        if (profileRepository.count() == 0) {
            seedProfile();
            log.info("Seed data loaded: profile");
        } else {
            log.info("Profiles table already has {} rows — skipping seed", profileRepository.count());
        }

        if (skillCategoryRepository.count() == 0) {
            seedSkills();
            log.info("Seed data loaded: {} skill categories", skillCategoryRepository.count());
        } else {
            log.info("Skill categories table already has {} rows — skipping seed", skillCategoryRepository.count());
        }

        if (educationRepository.count() == 0) {
            seedEducation();
            log.info("Seed data loaded: {} education records", educationRepository.count());
        } else {
            log.info("Education table already has {} rows — skipping seed", educationRepository.count());
        }
    }

    private void seedProjects() {
        Project foodflow = new Project(
                "foodflow-backend",
                "FoodFlow Backend",
                "A completed console-based food delivery backend system built with Core Java, JDBC, MySQL, Maven, JUnit 5, and Layered Architecture.",
                "completed",
                "https://github.com/rehanjirayat-hub/foodflow-backend",
                "A console-based food delivery backend system developed with the listed Java, database, testing, and architecture technologies.",
                "Layered Architecture.",
                "JUnit 5 is included in the project technology stack."
        );
        addTech(foodflow, "Core Java", TechnologyCategory.language);
        addTech(foodflow, "JDBC", TechnologyCategory.framework);
        addTech(foodflow, "MySQL", TechnologyCategory.database);
        addTech(foodflow, "Maven", TechnologyCategory.tool);
        addTech(foodflow, "JUnit 5", TechnologyCategory.testing);
        addTech(foodflow, "Layered Architecture", TechnologyCategory.architecture);
        projectRepository.save(foodflow);

        Project payroll = new Project(
                "employee-payroll-system",
                "Employee Management & Payroll System",
                "A completed Java console-based employee management and payroll system built with Java 21, OOP, Collections, JDBC, MySQL, Maven, JUnit 5, Git/GitHub, and Layered Architecture.",
                "completed",
                "https://github.com/rehanjirayat-hub/employee-payroll-system",
                "A Java console-based system for employee management and payroll, using the listed Core Java, JDBC, database, testing, and development technologies.",
                "Layered Architecture.",
                "JUnit 5 integration tests are documented in the repository."
        );
        addTech(payroll, "Java 21", TechnologyCategory.language);
        addTech(payroll, "OOP", TechnologyCategory.architecture);
        addTech(payroll, "Collections", TechnologyCategory.framework);
        addTech(payroll, "JDBC", TechnologyCategory.framework);
        addTech(payroll, "MySQL", TechnologyCategory.database);
        addTech(payroll, "Maven", TechnologyCategory.tool);
        addTech(payroll, "JUnit 5", TechnologyCategory.testing);
        addTech(payroll, "Git/GitHub", TechnologyCategory.tool);
        addTech(payroll, "Layered Architecture", TechnologyCategory.architecture);
        projectRepository.save(payroll);
    }

    private void addTech(Project project, String name, TechnologyCategory category) {
        ProjectTechnology tech = new ProjectTechnology(name, category);
        tech.setProject(project);
        project.getTechnologies().add(tech);
    }

    private void seedProfile() {
        Profile profile = new Profile(
                "Mohammad Rehan Jirayat",
                "Java Backend Developer",
                "Spring Boot \u2022 REST APIs \u2022 JPA/Hibernate \u2022 MySQL",
                "Belagavi, Karnataka, India",
                "rehanjirayat@gmail.com",
                "9900422726",
                "I build secure, scalable, and maintainable backend applications using Java and Spring Boot."
        );
        addLink(profile, "github", "https://github.com/rehanjirayat-hub", "GitHub profile");
        addLink(profile, "linkedin", "https://www.linkedin.com/in/rehan-jirat-5683573a2/", "LinkedIn profile");
        addLink(profile, "leetcode", "https://leetcode.com/u/sKGBJtR8N6/", "LeetCode profile");
        addLink(profile, "email", "mailto:rehanjirayat@gmail.com", "Email Mohammad Rehan Jirayat");
        profileRepository.save(profile);
    }

    private void addLink(Profile profile, String platform, String href, String label) {
        SocialLink link = new SocialLink(platform, href, label);
        link.setProfile(profile);
        profile.getSocialLinks().add(link);
    }

    private void seedEducation() {
        Education mca = new Education(
                "mca-vtu",
                "Master of Computer Applications (MCA)",
                "Visvesvaraya Technological University (VTU)",
                null,
                "Jnana Sangama, Belagavi, Karnataka, India",
                2025,
                2027,
                2027,
                "currently-pursuing",
                69,
                "https://vtu.ac.in/"
        );
        educationRepository.save(mca);

        Education bca = new Education(
                "bca-bharatesh",
                "Bachelor of Computer Applications (BCA)",
                "Bharatesh College of Computer Applications",
                "Rani Channamma University (RCU)",
                "Belagavi, Karnataka, India",
                2022,
                2025,
                null,
                "completed",
                66,
                "https://www.bharateshcollege.org/"
        );
        educationRepository.save(bca);
    }

    private void seedSkills() {
        SkillCategory javaBackend = new SkillCategory(
                "java-backend", "Java & Backend",
                "Core Java and backend application foundations", SkillEmphasis.primary);
        addSkill(javaBackend, "Core Java");
        addSkill(javaBackend, "OOP");
        addSkill(javaBackend, "Collections");
        addSkill(javaBackend, "Exception Handling");
        addSkill(javaBackend, "Multithreading");
        addSkill(javaBackend, "DSA");
        addSkill(javaBackend, "JDBC");
        addSkill(javaBackend, "Servlets");
        addSkill(javaBackend, "JSP");
        addSkill(javaBackend, "REST APIs");
        addSkill(javaBackend, "Logging");
        addSkill(javaBackend, "Spring AI");
        skillCategoryRepository.save(javaBackend);

        SkillCategory spring = new SkillCategory(
                "spring-ecosystem", "Spring Ecosystem",
                "Frameworks, APIs, and security for backend development", SkillEmphasis.primary);
        addSkill(spring, "Spring Framework");
        addSkill(spring, "Spring Boot");
        addSkill(spring, "Spring MVC");
        addSkill(spring, "Spring Data JPA");
        addSkill(spring, "Hibernate");
        addSkill(spring, "Spring Security");
        addSkill(spring, "JWT");
        addSkill(spring, "OAuth2");
        skillCategoryRepository.save(spring);

        SkillCategory database = new SkillCategory(
                "database", "Database",
                "Persistent data and SQL fundamentals", SkillEmphasis.secondary);
        addSkill(database, "MySQL");
        addSkill(database, "SQL");
        skillCategoryRepository.save(database);

        SkillCategory architecture = new SkillCategory(
                "architecture", "Architecture",
                "Layered and service-oriented backend design", SkillEmphasis.secondary);
        addSkill(architecture, "Layered Architecture");
        addSkill(architecture, "MVC (Model-View-Controller)");
        addSkill(architecture, "Microservices");
        skillCategoryRepository.save(architecture);

        SkillCategory testingTools = new SkillCategory(
                "testing-tools", "Testing & Development Tools",
                "Build, test, and API validation workflows", SkillEmphasis.secondary);
        addSkill(testingTools, "Maven");
        addSkill(testingTools, "Gradle");
        addSkill(testingTools, "JUnit 5");
        addSkill(testingTools, "Mockito");
        addSkill(testingTools, "Git");
        addSkill(testingTools, "GitHub");
        addSkill(testingTools, "Postman");
        skillCategoryRepository.save(testingTools);

        SkillCategory ides = new SkillCategory(
                "ides", "IDEs",
                "Core development environments", SkillEmphasis.supporting);
        addSkill(ides, "IntelliJ IDEA");
        addSkill(ides, "Eclipse");
        addSkill(ides, "Visual Studio Code");
        skillCategoryRepository.save(ides);

        SkillCategory devops = new SkillCategory(
                "devops-cloud", "DevOps & Cloud",
                "Deployment and operational support", SkillEmphasis.supporting);
        addSkill(devops, "Docker");
        addSkill(devops, "Cloud Deployment");
        addSkill(devops, "Linux");
        addSkill(devops, "Ansible");
        addSkill(devops, "Jenkins");
        addSkill(devops, "Terraform");
        skillCategoryRepository.save(devops);

        SkillCategory frontend = new SkillCategory(
                "frontend", "Supporting Frontend",
                "Supporting UI and web foundation technologies", SkillEmphasis.supporting);
        addSkill(frontend, "React");
        addSkill(frontend, "TypeScript");
        addSkill(frontend, "JavaScript");
        addSkill(frontend, "HTML");
        addSkill(frontend, "CSS");
        addSkill(frontend, "Tailwind CSS");
        skillCategoryRepository.save(frontend);
    }

    private void addSkill(SkillCategory category, String skillName) {
        CategorySkill skill = new CategorySkill(skillName);
        skill.setCategory(category);
        category.getSkills().add(skill);
    }
}
