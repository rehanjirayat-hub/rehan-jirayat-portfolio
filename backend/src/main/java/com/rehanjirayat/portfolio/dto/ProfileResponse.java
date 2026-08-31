package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.domain.SocialLink;

import java.util.List;

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
            String label
    ) {}

    public static ProfileResponse fromProfile(Profile profile) {
        List<SocialLinkDto> links = profile.getSocialLinks().stream()
                .map(sl -> new SocialLinkDto(sl.getPlatform(), sl.getHref(), sl.getLabel()))
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
