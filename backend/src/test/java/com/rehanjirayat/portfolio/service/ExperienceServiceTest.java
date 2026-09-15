package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Experience;
import com.rehanjirayat.portfolio.dto.AdminExperienceRequest;
import com.rehanjirayat.portfolio.repository.ExperienceRepository;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ExperienceServiceTest {
    @Test
    void createsFutureExperienceRecordsWithoutExistingData() {
        ExperienceRepository repository = mock(ExperienceRepository.class);
        ExperienceService service = new ExperienceService(repository);
        when(repository.save(any(Experience.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Experience result = service.save(null, new AdminExperienceRequest(
                "Backend Developer", "Example Company", "Belagavi", "2026-01", "", false,
                "Backend development work.", 0, "", true));

        assertEquals("Backend Developer", result.getJobTitle());
        assertEquals("Example Company", result.getCompany());
        assertEquals(0, result.getDisplayOrder());
    }
}
