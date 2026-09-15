package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.CategorySkill;
import com.rehanjirayat.portfolio.domain.SkillCategory;
import com.rehanjirayat.portfolio.dto.AdminSkillCategoryRequest;
import com.rehanjirayat.portfolio.repository.SkillCategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminSkillService {

    private final SkillCategoryRepository repository;

    public AdminSkillService(SkillCategoryRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public SkillCategory save(AdminSkillCategoryRequest request) {
        SkillCategory category = repository.findById(request.id())
                .orElseGet(() -> new SkillCategory(request.id(), request.title(), request.description(), request.emphasis()));
        category.updateContent(request.title(), request.description(), request.emphasis());
        category.getSkills().clear();
        if (request.skills() != null) {
            request.skills().forEach(skill -> {
                CategorySkill entity = new CategorySkill(skill);
                entity.setCategory(category);
                category.getSkills().add(entity);
            });
        }
        return repository.save(category);
    }

    public List<SkillCategory> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}