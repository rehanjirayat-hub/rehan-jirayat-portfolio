package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Education;
import com.rehanjirayat.portfolio.dto.EducationResponse;
import com.rehanjirayat.portfolio.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    @GetMapping
    public List<EducationResponse> findAll() {
        return service.findAll().stream()
                .map(EducationResponse::fromEducation)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationResponse> findById(@PathVariable String id) {
        Education edu = service.findById(id);
        return ResponseEntity.ok(EducationResponse.fromEducation(edu));
    }
}
