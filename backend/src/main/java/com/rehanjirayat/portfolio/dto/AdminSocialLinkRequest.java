package com.rehanjirayat.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminSocialLinkRequest(
        @NotBlank @Size(max = 20) String platform,
        @NotBlank @Size(max = 200) String href,
        @NotBlank @Size(max = 100) String label,
        Boolean visible,
        Integer displayOrder
) {
}