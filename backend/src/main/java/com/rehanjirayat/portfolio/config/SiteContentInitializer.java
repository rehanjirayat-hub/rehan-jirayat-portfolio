package com.rehanjirayat.portfolio.config;

import com.rehanjirayat.portfolio.repository.SiteContentRepository;
import com.rehanjirayat.portfolio.service.SiteContentService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SiteContentInitializer implements CommandLineRunner {
    private final SiteContentRepository repository;
    private final SiteContentService service;

    public SiteContentInitializer(SiteContentRepository repository, SiteContentService service) {
        this.repository = repository;
        this.service = service;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.save(service.createDefault());
        }
    }
}
