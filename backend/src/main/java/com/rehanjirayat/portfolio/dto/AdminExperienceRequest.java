package com.rehanjirayat.portfolio.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminExperienceRequest(
        @NotBlank @Size(max = 150) String jobTitle,
        @NotBlank @Size(max = 200) String company,
        @NotBlank @Size(max = 200) String location,
        @NotBlank @Size(max = 20) String startDate,
        @Size(max = 20) String endDate,
        boolean current,
        @NotBlank String description,
        @Min(0) int displayOrder,
        @Size(max = 500) String companyUrl,
        Boolean visible
) {
}
