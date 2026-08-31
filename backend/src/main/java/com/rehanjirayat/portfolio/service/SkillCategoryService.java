package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.SkillCategory;
import com.rehanjirayat.portfolio.repository.SkillCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillCategoryService {

    private final SkillCategoryRepository repository;

    public SkillCategoryService(SkillCategoryRepository repository) {
        this.repository = repository;
    }

    public List<SkillCategory> findAll() {
        return repository.findAll();
    }
}
