package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.*;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DtoMappingTest {

    @Test
    void profileResponse_mapsAllFields() {
        Profile profile = new Profile("John", "Developer", "Java", "City",
                "j@test.com", "123", "Hero text");
        profile.getSocialLinks().add(new SocialLink("github", "https://github.com/j", "GitHub"));

        ProfileResponse response = ProfileResponse.fromProfile(profile);

        assertEquals("John", response.name());
        assertEquals("Developer", response.role());
        assertEquals("Java", response.specialization());
        assertEquals("City", response.location());
        assertEquals("j@test.com", response.email());
        assertEquals("123", response.phone());
        assertEquals("Hero text", response.heroStatement());
        assertEquals(1, response.socialLinks().size());
        assertEquals("github", response.socialLinks().getFirst().platform());
        assertEquals("https://github.com/j", response.socialLinks().getFirst().href());
        assertEquals("GitHub", response.socialLinks().getFirst().label());
    }

    @Test
    void projectResponse_mapsAllFieldsIncludingTechnologies() {
        Project project = new Project("p1", "Project", "Desc", "done",
                "https://github.com/test", "Overview", "Arch", "Test");
        project.getTechnologies().add(new ProjectTechnology("Java", TechnologyCategory.language));
        project.getTechnologies().add(new ProjectTechnology("MySQL", TechnologyCategory.database));

        ProjectResponse response = ProjectResponse.fromProject(project);

        assertEquals("p1", response.id());
        assertEquals("Project", response.name());
        assertEquals("Desc", response.description());
        assertEquals("done", response.status());
        assertEquals("https://github.com/test", response.githubUrl());
        assertEquals("Overview", response.overview());
        assertEquals("Arch", response.architecture());
        assertEquals("Test", response.testing());
        assertEquals(2, response.technologies().size());
        assertEquals("Java", response.technologies().getFirst().name());
        assertEquals("language", response.technologies().getFirst().category());
        assertEquals("MySQL", response.technologies().getLast().name());
        assertEquals("database", response.technologies().getLast().category());
    }

    @Test
    void projectResponse_handlesNullCategory() {
        Project project = new Project("p1", "Project", "Desc", "done",
                "https://github.com/test", "Overview", "Arch", "Test");
        project.getTechnologies().add(new ProjectTechnology("Tool", null));

        ProjectResponse response = ProjectResponse.fromProject(project);

        assertNull(response.technologies().getFirst().category());
    }

    @Test
    void educationResponse_mapsAllFields() {
        Education edu = new Education("e1", "BCA", "College", "University",
                "City", 2022, 2025, null, "completed", 75, "https://example.com");

        EducationResponse response = EducationResponse.fromEducation(edu);

        assertEquals("e1", response.id());
        assertEquals("BCA", response.degree());
        assertEquals("College", response.institution());
        assertEquals("University", response.university());
        assertEquals("City", response.location());
        assertEquals(2022, response.startYear());
        assertEquals(2025, response.endYear());
        assertNull(response.expectedEndYear());
        assertEquals("completed", response.status());
        assertEquals(75, response.cgpa());
        assertEquals("https://example.com", response.website());
    }

    @Test
    void educationResponse_handlesExpectedEndYear() {
        Education edu = new Education("e1", "MCA", "Uni", null,
                "City", 2025, 2027, 2027, "currently-pursuing", 80, null);

        EducationResponse response = EducationResponse.fromEducation(edu);

        assertEquals(2027, response.expectedEndYear());
        assertEquals("currently-pursuing", response.status());
    }

    @Test
    void certificationResponse_mapsAllFields() {
        Certification cert = new Certification("c1", "AWS SA", "Amazon", "2024-01",
                "https://aws.example.com/cert");

        CertificationResponse response = CertificationResponse.fromCertification(cert);

        assertEquals("c1", response.id());
        assertEquals("AWS SA", response.name());
        assertEquals("Amazon", response.organization());
        assertEquals("2024-01", response.date());
        assertEquals("https://aws.example.com/cert", response.credentialUrl());
    }

    @Test
    void skillCategoryResponse_mapsAllFields() {
        SkillCategory cat = new SkillCategory("java", "Java", "Core Java", SkillEmphasis.primary);
        cat.getSkills().addAll(List.of("Java", "OOP"));

        SkillCategoryResponse response = SkillCategoryResponse.fromCategory(cat);

        assertEquals("java", response.id());
        assertEquals("Java", response.title());
        assertEquals("Core Java", response.description());
        assertEquals("primary", response.emphasis());
        assertEquals(2, response.skills().size());
        assertEquals("Java", response.skills().getFirst());
    }
}
