package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public Optional<Profile> findProfile() {
        return repository.findAll().stream().findFirst();
    }
}
