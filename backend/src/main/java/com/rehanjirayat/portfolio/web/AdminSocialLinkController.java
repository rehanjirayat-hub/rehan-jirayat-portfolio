package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminSocialLinkRequest;
import com.rehanjirayat.portfolio.dto.ProfileResponse;
import com.rehanjirayat.portfolio.service.AdminSocialLinkService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/social-links")
public class AdminSocialLinkController {

    private final AdminSocialLinkService service;

    public AdminSocialLinkController(AdminSocialLinkService service) {
        this.service = service;
    }

    @PutMapping
    public ProfileResponse replaceLinks(
            @Valid @RequestBody List<@Valid AdminSocialLinkRequest> requests) {
        return ProfileResponse.fromProfile(service.replaceLinks(requests));
    }
}