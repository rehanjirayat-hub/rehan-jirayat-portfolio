package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminEducationRequest;
import com.rehanjirayat.portfolio.dto.EducationResponse;
import com.rehanjirayat.portfolio.service.AdminEducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/education")
public class AdminEducationController {
    private final AdminEducationService service;

    public AdminEducationController(AdminEducationService service) { this.service = service; }

    @GetMapping
    public List<EducationResponse> findAll() {
        return service.findAll().stream().map(EducationResponse::fromEducation).toList();
    }

    @PutMapping("/{id}")
    public EducationResponse save(@PathVariable String id, @Valid @RequestBody AdminEducationRequest request) {
        if (!id.equals(request.id())) throw new IllegalArgumentException("Education id does not match the request path");
        return EducationResponse.fromEducation(service.save(request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) { service.delete(id); }
}