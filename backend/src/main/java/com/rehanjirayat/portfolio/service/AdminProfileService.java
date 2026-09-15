package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.dto.AdminProfileUpdateRequest;
import com.rehanjirayat.portfolio.repository.ProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class AdminProfileService {

    private final ProfileRepository profileRepository;

    public AdminProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Transactional
    public Profile updateProfile(AdminProfileUpdateRequest request) {
        Profile profile = profileRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Portfolio profile is not initialized"));
        profile.updateContent(
                request.name(),
                request.role(),
                request.specialization(),
                request.location(),
                request.email(),
                request.phone(),
                request.heroStatement());
        return profileRepository.save(profile);
    }
}