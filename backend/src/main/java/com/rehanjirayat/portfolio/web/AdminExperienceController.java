package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminExperienceRequest;
import com.rehanjirayat.portfolio.dto.ExperienceResponse;
import com.rehanjirayat.portfolio.service.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/experience")
public class AdminExperienceController {
    private final ExperienceService service;

    public AdminExperienceController(ExperienceService service) { this.service = service; }

    @GetMapping
    public java.util.List<ExperienceResponse> findAll() {
        return service.findAll().stream().map(ExperienceResponse::fromExperience).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExperienceResponse create(@Valid @RequestBody AdminExperienceRequest request) {
        return ExperienceResponse.fromExperience(service.save(null, request));
    }

    @PutMapping("/{id}")
    public ExperienceResponse update(@PathVariable Long id, @Valid @RequestBody AdminExperienceRequest request) {
        return ExperienceResponse.fromExperience(service.save(id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
