package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.SiteResume;

import java.time.LocalDateTime;

/** Public view of the active resume - exposes the CDN URL only. */
public record PublicResumeResponse(
        boolean hasResume,
        String url,
        String originalFilename,
        LocalDateTime updatedAt
) {
    public static PublicResumeResponse fromResume(SiteResume resume) {
        return new PublicResumeResponse(true, resume.getSecureUrl(),
                resume.getOriginalFilename(), resume.getUpdatedAt());
    }

    public static PublicResumeResponse empty() {
        return new PublicResumeResponse(false, null, null, null);
    }
}
