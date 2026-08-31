package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.SkillCategory;
import com.rehanjirayat.portfolio.domain.SkillEmphasis;
import com.rehanjirayat.portfolio.service.SkillCategoryService;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SkillCategoryController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {"rate-limit.max-requests=100", "rate-limit.window-minutes=15"})
class SkillCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SkillCategoryService skillCategoryService;

    @Test
    void findAll_returnsOkWithSkillCategories() throws Exception {
        SkillCategory cat = new SkillCategory("java-backend", "Java", "Core Java", SkillEmphasis.primary);
        cat.getSkills().addAll(List.of("Java", "OOP", "Collections"));

        when(skillCategoryService.findAll()).thenReturn(List.of(cat));

        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value("java-backend"))
                .andExpect(jsonPath("$[0].title").value("Java"))
                .andExpect(jsonPath("$[0].description").value("Core Java"))
                .andExpect(jsonPath("$[0].emphasis").value("primary"))
                .andExpect(jsonPath("$[0].skills").isArray())
                .andExpect(jsonPath("$[0].skills.length()").value(3))
                .andExpect(jsonPath("$[0].skills[0]").value("Java"));
    }

    @Test
    void findAll_returnsEmptyListWhenNoCategories() throws Exception {
        when(skillCategoryService.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }
}
