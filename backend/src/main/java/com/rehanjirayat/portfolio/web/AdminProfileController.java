package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminProfileUpdateRequest;
import com.rehanjirayat.portfolio.dto.ProfileResponse;
import com.rehanjirayat.portfolio.service.AdminProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController {

    private final AdminProfileService service;

    public AdminProfileController(AdminProfileService service) {
        this.service = service;
    }

    @PutMapping
    public ProfileResponse updateProfile(@Valid @RequestBody AdminProfileUpdateRequest request) {
        return ProfileResponse.fromProfile(service.updateProfile(request));
    }
}