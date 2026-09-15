package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.SiteResume;
import com.rehanjirayat.portfolio.dto.ResumeStatusResponse;
import com.rehanjirayat.portfolio.repository.SiteResumeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResumeServiceTest {

    @Mock
    private SiteResumeRepository repository;

    @Mock
    private MediaStorageService storage;

    @InjectMocks
    private ResumeService service;

    @Test
    void getStatus_returnsEmptyWhenNoResume() {
        when(repository.findById("active")).thenReturn(Optional.empty());
        ResumeStatusResponse status = service.getStatus();
        assertFalse(status.hasResume());
    }

    @Test
    void getStatus_returnsActiveResume() {
        when(repository.findById("active"))
                .thenReturn(Optional.of(new SiteResume("active", "portfolio/resume/old", "https://cdn/resume.pdf", "resume.pdf", 1024L)));
        ResumeStatusResponse status = service.getStatus();
        assertTrue(status.hasResume());
        assertEquals("https://cdn/resume.pdf", status.url());
    }

    @Test
    void remove_throwsWhenNoResumeExists() {
        when(repository.findById("active")).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> service.remove());
    }

    @Test
    void remove_deletesFromStorageAndDatabase() throws Exception {
        SiteResume resume = new SiteResume("active", "portfolio/resume/old", "https://cdn/resume.pdf", "resume.pdf", 1024L);
        when(repository.findById("active")).thenReturn(Optional.of(resume));
        service.remove();
        verify(storage).destroy("portfolio/resume/old", "raw");
        verify(repository).delete(resume);
    }

    @Test
    void upload_replacesPreviousResume() {
        SiteResume previous = new SiteResume("active", "portfolio/resume/old", "https://cdn/old.pdf", "old.pdf", 1024L);
        when(repository.findById("active")).thenReturn(Optional.of(previous));
        org.springframework.mock.web.MockMultipartFile file =
                new org.springframework.mock.web.MockMultipartFile("file", "new.pdf", "application/pdf", new byte[64]);
        try {
            java.util.Map<?, ?> uploadResult = java.util.Map.of(
                    "public_id", "portfolio/resume/new",
                    "secure_url", "https://cdn/new.pdf",
                    "bytes", 64);
            org.mockito.Mockito.doReturn(uploadResult).when(storage).uploadResumePdf(any());
            ResumeStatusResponse status = service.upload(file);
            verify(storage).destroy("portfolio/resume/old", "raw");
            ArgumentCaptor<SiteResume> captor = ArgumentCaptor.forClass(SiteResume.class);
            verify(repository).save(captor.capture());
            assertEquals("portfolio/resume/new", captor.getValue().getPublicId());
            assertTrue(status.hasResume());
        } catch (java.io.IOException neverThrown) {
            throw new AssertionError(neverThrown);
        }
    }

    @Test
    void getStatus_reportsStorageConfiguredFlag() throws Exception {
        when(repository.findById("active")).thenReturn(Optional.empty());
        when(storage.isConfigured()).thenReturn(true);
        ResumeStatusResponse status = service.getStatus();
        assertTrue(status.storageConfigured());
        verify(storage, never()).destroy(any(), any());
    }
}
