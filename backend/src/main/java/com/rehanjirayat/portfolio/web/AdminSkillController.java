package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminSkillCategoryRequest;
import com.rehanjirayat.portfolio.dto.SkillCategoryResponse;
import com.rehanjirayat.portfolio.service.AdminSkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/skills")
public class AdminSkillController {
    private final AdminSkillService service;

    public AdminSkillController(AdminSkillService service) { this.service = service; }

    @GetMapping
    public List<SkillCategoryResponse> findAll() {
        return service.findAll().stream().map(SkillCategoryResponse::fromCategory).toList();
    }

    @PutMapping("/{id}")
    public SkillCategoryResponse save(@PathVariable String id, @Valid @RequestBody AdminSkillCategoryRequest request) {
        if (!id.equals(request.id())) throw new IllegalArgumentException("Skill category id does not match the request path");
        return SkillCategoryResponse.fromCategory(service.save(request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) { service.delete(id); }
}