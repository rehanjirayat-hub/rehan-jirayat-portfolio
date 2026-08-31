package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.SkillCategory;
import com.rehanjirayat.portfolio.dto.SkillCategoryResponse;
import com.rehanjirayat.portfolio.service.SkillCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillCategoryController {

    private final SkillCategoryService service;

    public SkillCategoryController(SkillCategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<SkillCategoryResponse> findAll() {
        return service.findAll().stream()
                .map(SkillCategoryResponse::fromCategory)
                .toList();
    }
}
