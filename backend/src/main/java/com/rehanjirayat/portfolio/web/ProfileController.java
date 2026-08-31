package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.ProfileResponse;
import com.rehanjirayat.portfolio.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {
        return service.findProfile()
                .map(profile -> ResponseEntity.ok(ProfileResponse.fromProfile(profile)))
                .orElse(ResponseEntity.notFound().build());
    }
}
