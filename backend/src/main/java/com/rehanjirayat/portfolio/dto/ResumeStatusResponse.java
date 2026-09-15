package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.SiteResume;

import java.time.LocalDateTime;

/** Admin view of the active resume. */
public record ResumeStatusResponse(
        boolean hasResume,
        String publicId,
        String url,
        String originalFilename,
        Long bytes,
        LocalDateTime updatedAt,
        boolean storageConfigured
) {
    public static ResumeStatusResponse fromResume(SiteResume resume, boolean storageConfigured) {
        return new ResumeStatusResponse(true, resume.getPublicId(), resume.getSecureUrl(),
                resume.getOriginalFilename(), resume.getBytes(), resume.getUpdatedAt(), storageConfigured);
    }

    public static ResumeStatusResponse empty(boolean storageConfigured) {
        return new ResumeStatusResponse(false, null, null, null, null, null, storageConfigured);
    }
}
