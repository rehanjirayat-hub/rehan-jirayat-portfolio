package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.domain.SocialLink;
import com.rehanjirayat.portfolio.dto.AdminSocialLinkRequest;
import com.rehanjirayat.portfolio.repository.ProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminSocialLinkService {

    private final ProfileRepository profileRepository;

    public AdminSocialLinkService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Transactional
    public Profile replaceLinks(List<AdminSocialLinkRequest> requests) {
        Profile profile = profileRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Portfolio profile is not initialized"));

        profile.getSocialLinks().clear();
        requests.forEach(request -> {
            SocialLink link = new SocialLink(request.platform(), request.href(), request.label());
            link.updateContent(request.href(), request.label(), request.visible(), request.displayOrder());
            link.setProfile(profile);
            profile.getSocialLinks().add(link);
        });
        return profileRepository.save(profile);
    }

    public List<com.rehanjirayat.portfolio.dto.ProfileResponse.SocialLinkDto> findAll() {
        return profileRepository.findAll().stream().findFirst()
                .map(profile -> profile.getSocialLinks().stream().map(com.rehanjirayat.portfolio.dto.ProfileResponse.SocialLinkDto::fromLink).toList())
                .orElse(List.of());
    }
}