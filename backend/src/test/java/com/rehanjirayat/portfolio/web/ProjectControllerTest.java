package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Project;
import com.rehanjirayat.portfolio.domain.ProjectTechnology;
import com.rehanjirayat.portfolio.domain.TechnologyCategory;
import com.rehanjirayat.portfolio.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import com.rehanjirayat.portfolio.config.ContactRateLimiter;
import com.rehanjirayat.portfolio.config.ContactRateLimitFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProjectController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {"rate-limit.max-requests=100", "rate-limit.window-minutes=15"})
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    private Project createTestProject() {
        Project project = new Project(
                "test-project", "Test Project", "A test project", "completed",
                "https://github.com/test/project", "Overview text",
                "Architecture text", "Testing text");
        addTech(project, "Java", TechnologyCategory.language);
        addTech(project, "Spring Boot", TechnologyCategory.framework);
        return project;
    }

    private void addTech(Project project, String name, TechnologyCategory category) {
        ProjectTechnology tech = new ProjectTechnology(name, category);
        tech.setProject(project);
        project.getTechnologies().add(tech);
    }

    @Test
    void findAll_returnsOkWithProjects() throws Exception {
        when(projectService.findAll()).thenReturn(List.of(createTestProject()));

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value("test-project"))
                .andExpect(jsonPath("$[0].name").value("Test Project"))
                .andExpect(jsonPath("$[0].description").value("A test project"))
                .andExpect(jsonPath("$[0].status").value("completed"))
                .andExpect(jsonPath("$[0].githubUrl").value("https://github.com/test/project"))
                .andExpect(jsonPath("$[0].technologies").isArray())
                .andExpect(jsonPath("$[0].technologies.length()").value(2))
                .andExpect(jsonPath("$[0].technologies[0].name").value("Java"))
                .andExpect(jsonPath("$[0].technologies[0].category").value("language"));
    }

    @Test
    void findAll_returnsEmptyListWhenNoProjects() throws Exception {
        when(projectService.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void findById_returnsOkForExistingProject() throws Exception {
        when(projectService.findById("test-project")).thenReturn(createTestProject());

        mockMvc.perform(get("/api/projects/test-project"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("test-project"))
                .andExpect(jsonPath("$.name").value("Test Project"));
    }

    @Test
    void findById_returnsNotFoundForInvalidId() throws Exception {
        when(projectService.findById("nonexistent")).thenThrow(
                new EntityNotFoundException("Project not found with id: nonexistent"));

        mockMvc.perform(get("/api/projects/nonexistent"))
                .andExpect(status().isNotFound());
    }
}
