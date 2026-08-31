package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Education;
import com.rehanjirayat.portfolio.service.EducationService;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EducationController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {"rate-limit.max-requests=100", "rate-limit.window-minutes=15"})
class EducationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EducationService educationService;

    private Education createMca() {
        return new Education("mca-vtu", "Master of Computer Applications (MCA)",
                "Visvesvaraya Technological University (VTU)", null,
                "Jnana Sangama, Belagavi", 2025, 2027, 2027,
                "currently-pursuing", 69, "https://vtu.ac.in/");
    }

    private Education createBca() {
        return new Education("bca-bharatesh", "Bachelor of Computer Applications (BCA)",
                "Bharatesh College of Computer Applications",
                "Rani Channamma University (RCU)", "Belagavi", 2022, 2025, null,
                "completed", 66, "https://www.bharateshcollege.org/");
    }

    @Test
    void findAll_returnsOkWithEducationRecords() throws Exception {
        when(educationService.findAll()).thenReturn(List.of(createMca(), createBca()));

        mockMvc.perform(get("/api/education"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value("mca-vtu"))
                .andExpect(jsonPath("$[0].degree").value("Master of Computer Applications (MCA)"))
                .andExpect(jsonPath("$[0].institution").value("Visvesvaraya Technological University (VTU)"))
                .andExpect(jsonPath("$[0].status").value("currently-pursuing"))
                .andExpect(jsonPath("$[0].cgpa").value(69))
                .andExpect(jsonPath("$[0].expectedEndYear").value(2027))
                .andExpect(jsonPath("$[1].id").value("bca-bharatesh"))
                .andExpect(jsonPath("$[1].degree").value("Bachelor of Computer Applications (BCA)"))
                .andExpect(jsonPath("$[1].university").value("Rani Channamma University (RCU)"))
                .andExpect(jsonPath("$[1].status").value("completed"))
                .andExpect(jsonPath("$[1].cgpa").value(66));
    }

    @Test
    void findAll_returnsEmptyListWhenNoEducation() throws Exception {
        when(educationService.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/education"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void findById_returnsOkForExistingRecord() throws Exception {
        when(educationService.findById("mca-vtu")).thenReturn(createMca());

        mockMvc.perform(get("/api/education/mca-vtu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("mca-vtu"))
                .andExpect(jsonPath("$.degree").value("Master of Computer Applications (MCA)"))
                .andExpect(jsonPath("$.startYear").value(2025))
                .andExpect(jsonPath("$.endYear").value(2027))
                .andExpect(jsonPath("$.website").value("https://vtu.ac.in/"));
    }

    @Test
    void findById_returnsNotFoundForInvalidId() throws Exception {
        when(educationService.findById("nonexistent")).thenThrow(
                new EntityNotFoundException("Education not found with id: nonexistent"));

        mockMvc.perform(get("/api/education/nonexistent"))
                .andExpect(status().isNotFound());
    }
}
