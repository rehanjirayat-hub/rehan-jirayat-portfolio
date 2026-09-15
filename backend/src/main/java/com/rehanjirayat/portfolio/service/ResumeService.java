package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.SiteResume;
import com.rehanjirayat.portfolio.dto.PublicResumeResponse;
import com.rehanjirayat.portfolio.dto.ResumeStatusResponse;
import com.rehanjirayat.portfolio.repository.SiteResumeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

/** Manages the single active portfolio resume (PDF). */
@Service
public class ResumeService {

    private final SiteResumeRepository repository;
    private final MediaStorageService storage;

    public ResumeService(SiteResumeRepository repository, MediaStorageService storage) {
        this.repository = repository;
        this.storage = storage;
    }

    public boolean isStorageConfigured() {
        return storage.isConfigured();
    }

    public ResumeStatusResponse getStatus() {
        return repository.findById(SiteResume.ACTIVE_ID)
                .map(resume -> ResumeStatusResponse.fromResume(resume, isStorageConfigured()))
                .orElseGet(() -> ResumeStatusResponse.empty(isStorageConfigured()));
    }

    public PublicResumeResponse getPublicResume() {
        return repository.findById(SiteResume.ACTIVE_ID)
                .map(PublicResumeResponse::fromResume)
                .orElseGet(PublicResumeResponse::empty);
    }

    @Transactional
    public ResumeStatusResponse upload(MultipartFile file) throws IOException {
        Map<?, ?> result = storage.uploadResumePdf(file);
        SiteResume current = repository.findById(SiteResume.ACTIVE_ID).orElse(null);
        if (current != null) {
            // Replace: remove the previous PDF from storage before overwriting the row.
            try {
                storage.destroy(current.getPublicId(), "raw");
            } catch (IOException exception) {
                // Old file may already be gone; the new upload is still authoritative.
            }
        }
        SiteResume resume = new SiteResume(SiteResume.ACTIVE_ID,
                String.valueOf(result.get("public_id")),
                String.valueOf(result.get("secure_url")),
                file.getOriginalFilename(),
                longValue(result.get("bytes")));
        repository.save(resume);
        return getStatus();
    }

    @Transactional
    public void remove() {
        SiteResume current = repository.findById(SiteResume.ACTIVE_ID)
                .orElseThrow(() -> new EntityNotFoundException("No resume has been uploaded yet"));
        try {
            storage.destroy(current.getPublicId(), "raw");
        } catch (IOException exception) {
            throw new IllegalStateException("Could not delete the resume file from storage.", exception);
        }
        repository.delete(current);
    }

    private Long longValue(Object value) {
        return value instanceof Number number ? Long.valueOf(number.longValue()) : 0L;
    }
}
