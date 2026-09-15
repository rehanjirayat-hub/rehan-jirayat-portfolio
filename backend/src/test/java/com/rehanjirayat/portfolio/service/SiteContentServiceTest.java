package com.rehanjirayat.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rehanjirayat.portfolio.domain.SiteContent;
import com.rehanjirayat.portfolio.repository.SiteContentRepository;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class SiteContentServiceTest {
    @Test
    void defaultContentPreservesCurrentPortfolioCopy() {
        SiteContentRepository repository = mock(SiteContentRepository.class);
        SiteContentService service = new SiteContentService(repository, new ObjectMapper());

        SiteContent content = service.createDefault();
        var response = service.toResponse(content);

        assertEquals("Spring Boot • REST APIs • JPA/Hibernate • MySQL", response.heroSubtitle());
        assertEquals("Building toward thoughtful Java backend development.", response.aboutHeading());
        assertEquals(9, response.navigation().size());
    }
}
