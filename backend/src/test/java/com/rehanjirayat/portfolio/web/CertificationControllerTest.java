package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Certification;
import com.rehanjirayat.portfolio.service.CertificationService;
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

@WebMvcTest(CertificationController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {"rate-limit.max-requests=100", "rate-limit.window-minutes=15"})
class CertificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CertificationService certificationService;

    @Test
    void findAll_returnsOkWithCertifications() throws Exception {
        Certification cert = new Certification("aws-sa", "AWS Solutions Architect",
                "Amazon Web Services", "2024-01", "https://aws.example.com/cert");
        when(certificationService.findAll()).thenReturn(List.of(cert));

        mockMvc.perform(get("/api/certifications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value("aws-sa"))
                .andExpect(jsonPath("$[0].name").value("AWS Solutions Architect"))
                .andExpect(jsonPath("$[0].organization").value("Amazon Web Services"))
                .andExpect(jsonPath("$[0].date").value("2024-01"))
                .andExpect(jsonPath("$[0].credentialUrl").value("https://aws.example.com/cert"));
    }

    @Test
    void findAll_returnsEmptyListWhenNoCertifications() throws Exception {
        when(certificationService.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/certifications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void findById_returnsNotFoundForNonexistent() throws Exception {
        when(certificationService.findById("nonexistent")).thenThrow(
                new EntityNotFoundException("Certification not found with id: nonexistent"));

        mockMvc.perform(get("/api/certifications/nonexistent"))
                .andExpect(status().isNotFound());
    }

    @Test
    void findById_returnsOkForExistingCertification() throws Exception {
        Certification cert = new Certification("aws-sa", "AWS Solutions Architect",
                "Amazon Web Services", "2024-01", "https://aws.example.com/cert");
        when(certificationService.findById("aws-sa")).thenReturn(cert);

        mockMvc.perform(get("/api/certifications/aws-sa"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("aws-sa"))
                .andExpect(jsonPath("$.name").value("AWS Solutions Architect"));
    }
}
