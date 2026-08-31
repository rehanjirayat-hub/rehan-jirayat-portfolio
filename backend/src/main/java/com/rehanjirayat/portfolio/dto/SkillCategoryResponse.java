package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.CategorySkill;
import com.rehanjirayat.portfolio.domain.SkillCategory;

import java.util.List;

public record SkillCategoryResponse(
        String id,
        String title,
        String description,
        String emphasis,
        List<String> skills
) {
    public static SkillCategoryResponse fromCategory(SkillCategory cat) {
        return new SkillCategoryResponse(
                cat.getId(),
                cat.getTitle(),
                cat.getDescription(),
                cat.getEmphasis().name(),
                cat.getSkills().stream().map(CategorySkill::getSkill).toList()
        );
    }
}
