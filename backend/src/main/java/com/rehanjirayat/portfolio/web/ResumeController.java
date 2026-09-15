package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.PublicResumeResponse;
import com.rehanjirayat.portfolio.service.ResumeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public endpoint returning the currently active resume URL.
 * Exposes only the CDN URL - no admin metadata.
 */
@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public PublicResumeResponse getActiveResume() {
        return resumeService.getPublicResume();
    }
}
