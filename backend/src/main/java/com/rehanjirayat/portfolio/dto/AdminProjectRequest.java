package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.TechnologyCategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminProjectRequest(
        @NotBlank @Size(max = 100) String id,
        @NotBlank @Size(max = 150) String name,
        @NotBlank String description,
        @NotBlank @Size(max = 20) String status,
        List<@Valid TechnologyRequest> technologies,
        @NotBlank @Size(max = 500) String githubUrl,
        @NotBlank String overview,
        @NotBlank String architecture,
        @NotBlank String testing,
        Boolean visible,
        Integer displayOrder
) {
    public record TechnologyRequest(
            @NotBlank @Size(max = 50) String name,
            @NotNull TechnologyCategory category
    ) {
    }
}