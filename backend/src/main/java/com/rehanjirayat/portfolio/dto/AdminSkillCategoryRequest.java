package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.SkillEmphasis;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminSkillCategoryRequest(
        @NotBlank @Size(max = 50) String id,
        @NotBlank @Size(max = 100) String title,
        @NotBlank @Size(max = 200) String description,
        @NotNull SkillEmphasis emphasis,
        List<@NotBlank @Size(max = 255) String> skills
) {
}