package com.rehanjirayat.portfolio.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record AdminSiteContentRequest(
        @NotBlank @Size(max = 150) String heroSubtitle,
        @NotBlank @Size(max = 200) String heroPrimaryCtaLabel,
        @NotBlank @Size(max = 500) String heroPrimaryCtaUrl,
        @NotBlank @Size(max = 200) String heroSecondaryCtaLabel,
        @NotBlank @Size(max = 500) String heroSecondaryCtaUrl,
        @NotBlank @Size(max = 150) String aboutEyebrow,
        @NotBlank String aboutHeading,
        @NotBlank String aboutParagraphOne,
        @NotBlank String aboutParagraphTwo,
        @NotBlank @Size(max = 200) String aboutCtaLabel,
        @NotBlank @Size(max = 500) String aboutCtaUrl,
        @NotBlank @Size(max = 200) String contactHeading,
        @NotBlank String contactDescription,
        @NotBlank @Size(max = 200) String footerDescription,
        @NotBlank @Size(max = 200) String copyrightText,
        @NotBlank @Size(max = 200) String siteName,
        @NotBlank @Size(max = 200) String professionalTitle,
        @NotEmpty List<@Valid NavigationItem> navigation,
        @NotEmpty List<@Valid SectionSetting> sections
) {
    public record NavigationItem(
            @NotBlank @Size(max = 100) String label,
            @NotBlank @Size(max = 500) String href,
            boolean isExternal,
            boolean visible,
            int displayOrder
    ) {}

    public record SectionSetting(
            @NotBlank @Size(max = 50) String id,
            boolean visible,
            int displayOrder
    ) {}
}
