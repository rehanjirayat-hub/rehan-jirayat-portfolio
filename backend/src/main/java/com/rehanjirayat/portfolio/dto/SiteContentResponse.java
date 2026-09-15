package com.rehanjirayat.portfolio.dto;

import java.util.List;

public record SiteContentResponse(
        String heroSubtitle,
        String heroPrimaryCtaLabel,
        String heroPrimaryCtaUrl,
        String heroSecondaryCtaLabel,
        String heroSecondaryCtaUrl,
        String aboutEyebrow,
        String aboutHeading,
        String aboutParagraphOne,
        String aboutParagraphTwo,
        String aboutCtaLabel,
        String aboutCtaUrl,
        String contactHeading,
        String contactDescription,
        String footerDescription,
        String copyrightText,
        String siteName,
        String professionalTitle,
        List<NavigationItem> navigation,
        List<SectionSetting> sections
) {
    public record NavigationItem(String label, String href, boolean isExternal, boolean visible, int displayOrder) {}
    public record SectionSetting(String id, boolean visible, int displayOrder) {}
}
