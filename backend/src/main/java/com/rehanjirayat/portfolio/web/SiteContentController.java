package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.SiteContentResponse;
import com.rehanjirayat.portfolio.service.SiteContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/site-content")
public class SiteContentController {
    private final SiteContentService service;

    public SiteContentController(SiteContentService service) { this.service = service; }

    @GetMapping
    public SiteContentResponse find() { return service.find(); }
}
