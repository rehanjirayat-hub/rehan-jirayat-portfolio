package com.rehanjirayat.portfolio.config;

import com.rehanjirayat.portfolio.repository.*;
import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.domain.SocialLink;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DataSeederTest {

    @Mock private ProjectRepository projectRepository;
    @Mock private CertificationRepository certificationRepository;
    @Mock private ProfileRepository profileRepository;
    @Mock private SkillCategoryRepository skillCategoryRepository;
    @Mock private EducationRepository educationRepository;

    @InjectMocks
    private DataSeeder dataSeeder;

    @BeforeEach
    void setUp() {
        // Default: tables have data (no seeding needed)
        when(projectRepository.count()).thenReturn(2L);
        when(certificationRepository.count()).thenReturn(0L);
        when(profileRepository.count()).thenReturn(1L);
        when(skillCategoryRepository.count()).thenReturn(8L);
        when(educationRepository.count()).thenReturn(2L);
    }

    @Test
    void run_skipsProjectsWhenAlreadySeeded() {
        dataSeeder.run();

        verify(projectRepository, never()).save(any());
    }

    @Test
    void run_updatesLinkedInProfileWhenAlreadySeeded() {
        Profile profile = new Profile("Name", "Role", "Specialization", "Location", "email", "phone", "Statement");
        SocialLink linkedin = new SocialLink("linkedin", "https://www.linkedin.com/in/rehan-jirat-5683573a2/", "LinkedIn profile");
        linkedin.setProfile(profile);
        profile.getSocialLinks().add(linkedin);
        when(profileRepository.findAll()).thenReturn(java.util.List.of(profile));

        dataSeeder.run();

        verify(profileRepository).save(profile);
        org.junit.jupiter.api.Assertions.assertEquals(
                "https://www.linkedin.com/in/mohammad-rehan-jirayat-5683573a2/",
                linkedin.getHref());
    }

    @Test
    void run_skipsSkillsWhenAlreadySeeded() {
        dataSeeder.run();

        verify(skillCategoryRepository, never()).save(any());
    }

    @Test
    void run_skipsEducationWhenAlreadySeeded() {
        dataSeeder.run();

        verify(educationRepository, never()).save(any());
    }

    @Test
    void run_seedsProjectsWhenEmpty() {
        when(projectRepository.count()).thenReturn(0L).thenReturn(2L);
        when(certificationRepository.count()).thenReturn(0L);
        when(profileRepository.count()).thenReturn(1L);
        when(skillCategoryRepository.count()).thenReturn(8L);
        when(educationRepository.count()).thenReturn(2L);

        dataSeeder.run();

        verify(projectRepository, atLeastOnce()).save(any());
    }

    @Test
    void run_seedsProfileWhenEmpty() {
        when(projectRepository.count()).thenReturn(2L);
        when(certificationRepository.count()).thenReturn(0L);
        when(profileRepository.count()).thenReturn(0L).thenReturn(1L);
        when(skillCategoryRepository.count()).thenReturn(8L);
        when(educationRepository.count()).thenReturn(2L);

        dataSeeder.run();

        verify(profileRepository, atLeastOnce()).save(any());
    }

    @Test
    void run_seedsSkillsWhenEmpty() {
        when(projectRepository.count()).thenReturn(2L);
        when(certificationRepository.count()).thenReturn(0L);
        when(profileRepository.count()).thenReturn(1L);
        when(skillCategoryRepository.count()).thenReturn(0L).thenReturn(8L);
        when(educationRepository.count()).thenReturn(2L);

        dataSeeder.run();

        verify(skillCategoryRepository, atLeastOnce()).save(any());
    }

    @Test
    void run_seedsEducationWhenEmpty() {
        when(projectRepository.count()).thenReturn(2L);
        when(certificationRepository.count()).thenReturn(0L);
        when(profileRepository.count()).thenReturn(1L);
        when(skillCategoryRepository.count()).thenReturn(8L);
        when(educationRepository.count()).thenReturn(0L).thenReturn(2L);

        dataSeeder.run();

        verify(educationRepository, atLeastOnce()).save(any());
    }

    @Test
    void run_certificationsEmptyLogsMessageButDoesNotSeed() {
        when(certificationRepository.count()).thenReturn(0L);

        dataSeeder.run();

        // Certifications have no seed data, so save is never called
        verify(certificationRepository, never()).save(any());
    }

    @Test
    void run_seedsAllWhenAllTablesEmpty() {
        when(projectRepository.count()).thenReturn(0L).thenReturn(2L);
        when(certificationRepository.count()).thenReturn(0L);
        when(profileRepository.count()).thenReturn(0L).thenReturn(1L);
        when(skillCategoryRepository.count()).thenReturn(0L).thenReturn(8L);
        when(educationRepository.count()).thenReturn(0L).thenReturn(2L);

        dataSeeder.run();

        verify(projectRepository, atLeastOnce()).save(any());
        verify(profileRepository, atLeastOnce()).save(any());
        verify(skillCategoryRepository, atLeastOnce()).save(any());
        verify(educationRepository, atLeastOnce()).save(any());
    }
}
