package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.ExperienceResponse;
import com.rehanjirayat.portfolio.service.ExperienceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {
    private final ExperienceService service;

    public ExperienceController(ExperienceService service) { this.service = service; }

    @GetMapping
    public java.util.List<ExperienceResponse> findAll() {
        return service.findAll().stream().map(ExperienceResponse::fromExperience).toList();
    }
}
