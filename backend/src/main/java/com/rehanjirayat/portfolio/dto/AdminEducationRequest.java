package com.rehanjirayat.portfolio.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminEducationRequest(
        @NotBlank @Size(max = 100) String id,
        @NotBlank @Size(max = 200) String degree,
        @NotBlank @Size(max = 300) String institution,
        @Size(max = 300) String university,
        @NotBlank @Size(max = 300) String location,
        @Min(1900) int startYear,
        @Min(1900) int endYear,
        Integer expectedEndYear,
        @NotBlank @Size(max = 50) String status,
        @Min(0) int cgpa,
        @Size(max = 500) String website,
        Boolean visible,
        Integer displayOrder
) {
}