package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.domain.SocialLink;

import java.util.List;
import java.util.Comparator;

public record ProfileResponse(
        String name,
        String role,
        String specialization,
        String location,
        String email,
        String phone,
        String heroStatement,
        List<SocialLinkDto> socialLinks
) {
    public record SocialLinkDto(
            String platform,
            String href,
            String label,
            boolean visible,
            int displayOrder
        ) {
                public static SocialLinkDto fromLink(SocialLink link) {
                        return new SocialLinkDto(link.getPlatform(), link.getHref(), link.getLabel(), link.isVisible(), link.getDisplayOrder());
                }
        }

    public static ProfileResponse fromProfile(Profile profile) {
        List<SocialLinkDto> links = profile.getSocialLinks().stream()
                .filter(SocialLink::isVisible)
                .sorted(Comparator.comparingInt(SocialLink::getDisplayOrder))
                .map(sl -> new SocialLinkDto(sl.getPlatform(), sl.getHref(), sl.getLabel(), sl.isVisible(), sl.getDisplayOrder()))
                .toList();

        return new ProfileResponse(
                profile.getName(),
                profile.getRole(),
                profile.getSpecialization(),
                profile.getLocation(),
                profile.getEmail(),
                profile.getPhone(),
                profile.getHeroStatement(),
                links
        );
    }
}
