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

    public DataSeeder(ProjectRepository projectRepository,
                     CertificationRepository certificationRepository,
                     ProfileRepository profileRepository,
                     SkillCategoryRepository skillCategoryRepository) {
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
        this.profileRepository = profileRepository;
        this.skillCategoryRepository = skillCategoryRepository;
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
        foodflow.getTechnologies().addAll(List.of(
                new ProjectTechnology("Core Java", TechnologyCategory.language),
                new ProjectTechnology("JDBC", TechnologyCategory.framework),
                new ProjectTechnology("MySQL", TechnologyCategory.database),
                new ProjectTechnology("Maven", TechnologyCategory.tool),
                new ProjectTechnology("JUnit 5", TechnologyCategory.testing),
                new ProjectTechnology("Layered Architecture", TechnologyCategory.architecture)
        ));
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
        payroll.getTechnologies().addAll(List.of(
                new ProjectTechnology("Java 21", TechnologyCategory.language),
                new ProjectTechnology("OOP", TechnologyCategory.architecture),
                new ProjectTechnology("Collections", TechnologyCategory.framework),
                new ProjectTechnology("JDBC", TechnologyCategory.framework),
                new ProjectTechnology("MySQL", TechnologyCategory.database),
                new ProjectTechnology("Maven", TechnologyCategory.tool),
                new ProjectTechnology("JUnit 5", TechnologyCategory.testing),
                new ProjectTechnology("Git/GitHub", TechnologyCategory.tool),
                new ProjectTechnology("Layered Architecture", TechnologyCategory.architecture)
        ));
        projectRepository.save(payroll);
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
        profile.getSocialLinks().addAll(List.of(
                new SocialLink("github", "https://github.com/rehanjirayat-hub", "GitHub profile"),
                new SocialLink("linkedin", "https://www.linkedin.com/in/rehan-jirat-5683573a2/", "LinkedIn profile"),
                new SocialLink("leetcode", "https://leetcode.com/u/sKGBJtR8N6/", "LeetCode profile"),
                new SocialLink("email", "mailto:rehanjirayat@gmail.com", "Email Mohammad Rehan Jirayat")
        ));
        profileRepository.save(profile);
    }

    private void seedSkills() {
        SkillCategory javaBackend = new SkillCategory(
                "java-backend", "Java & Backend",
                "Core Java and backend application foundations", SkillEmphasis.primary);
        javaBackend.getSkills().addAll(List.of(
                "Core Java", "OOP", "Collections", "Exception Handling",
                "Multithreading", "DSA", "JDBC", "Servlets", "JSP",
                "REST APIs", "Logging", "Spring AI"));
        skillCategoryRepository.save(javaBackend);

        SkillCategory spring = new SkillCategory(
                "spring-ecosystem", "Spring Ecosystem",
                "Frameworks, APIs, and security for backend development", SkillEmphasis.primary);
        spring.getSkills().addAll(List.of(
                "Spring Framework", "Spring Boot", "Spring MVC", "Spring Data JPA",
                "Hibernate", "Spring Security", "JWT", "OAuth2"));
        skillCategoryRepository.save(spring);

        SkillCategory database = new SkillCategory(
                "database", "Database",
                "Persistent data and SQL fundamentals", SkillEmphasis.secondary);
        database.getSkills().addAll(List.of("MySQL", "SQL"));
        skillCategoryRepository.save(database);

        SkillCategory architecture = new SkillCategory(
                "architecture", "Architecture",
                "Layered and service-oriented backend design", SkillEmphasis.secondary);
        architecture.getSkills().addAll(List.of(
                "Layered Architecture", "MVC (Model-View-Controller)", "Microservices"));
        skillCategoryRepository.save(architecture);

        SkillCategory testingTools = new SkillCategory(
                "testing-tools", "Testing & Development Tools",
                "Build, test, and API validation workflows", SkillEmphasis.secondary);
        testingTools.getSkills().addAll(List.of(
                "Maven", "Gradle", "JUnit 5", "Mockito", "Git", "GitHub", "Postman"));
        skillCategoryRepository.save(testingTools);

        SkillCategory ides = new SkillCategory(
                "ides", "IDEs",
                "Core development environments", SkillEmphasis.supporting);
        ides.getSkills().addAll(List.of("IntelliJ IDEA", "Eclipse", "Visual Studio Code"));
        skillCategoryRepository.save(ides);

        SkillCategory devops = new SkillCategory(
                "devops-cloud", "DevOps & Cloud",
                "Deployment and operational support", SkillEmphasis.supporting);
        devops.getSkills().addAll(List.of(
                "Docker", "Cloud Deployment", "Linux", "Ansible", "Jenkins", "Terraform"));
        skillCategoryRepository.save(devops);

        SkillCategory frontend = new SkillCategory(
                "frontend", "Supporting Frontend",
                "Supporting UI and web foundation technologies", SkillEmphasis.supporting);
        frontend.getSkills().addAll(List.of(
                "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"));
        skillCategoryRepository.save(frontend);
    }
}
