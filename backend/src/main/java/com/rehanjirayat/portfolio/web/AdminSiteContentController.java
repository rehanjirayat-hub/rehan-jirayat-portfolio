package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminSiteContentRequest;
import com.rehanjirayat.portfolio.dto.SiteContentResponse;
import com.rehanjirayat.portfolio.service.SiteContentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/site-content")
public class AdminSiteContentController {
    private final SiteContentService service;

    public AdminSiteContentController(SiteContentService service) { this.service = service; }

    @GetMapping
    public SiteContentResponse find() { return service.find(); }

    @PutMapping
    public SiteContentResponse update(@Valid @RequestBody AdminSiteContentRequest request) {
        return service.update(request);
    }
}
