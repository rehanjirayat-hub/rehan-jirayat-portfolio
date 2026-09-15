package com.rehanjirayat.portfolio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rehanjirayat.portfolio.domain.SiteContent;
import com.rehanjirayat.portfolio.dto.AdminSiteContentRequest;
import com.rehanjirayat.portfolio.dto.SiteContentResponse;
import com.rehanjirayat.portfolio.repository.SiteContentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SiteContentService {
    public static final String DEFAULT_ID = "default";

    private final SiteContentRepository repository;
    private final ObjectMapper objectMapper;

    public SiteContentService(SiteContentRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    public SiteContentResponse find() {
        return toResponse(repository.findById(DEFAULT_ID).orElseThrow(() -> new IllegalStateException("Site content is not initialized")));
    }

    @Transactional
    public SiteContentResponse update(AdminSiteContentRequest request) {
        SiteContent content = repository.findById(DEFAULT_ID)
                .orElseThrow(() -> new IllegalStateException("Site content is not initialized"));
        content.update(request.heroSubtitle(), request.heroPrimaryCtaLabel(), request.heroPrimaryCtaUrl(),
                request.heroSecondaryCtaLabel(), request.heroSecondaryCtaUrl(), request.aboutEyebrow(),
                request.aboutHeading(), request.aboutParagraphOne(), request.aboutParagraphTwo(),
                request.aboutCtaLabel(), request.aboutCtaUrl(), request.contactHeading(), request.contactDescription(),
                request.footerDescription(), request.copyrightText(), write(request.navigation()), write(request.sections()),
                request.siteName(), request.professionalTitle());
        return toResponse(repository.save(content));
    }

    public SiteContent createDefault() {
        return new SiteContent(DEFAULT_ID,
                "Spring Boot • REST APIs • JPA/Hibernate • MySQL",
                "View Projects", "#projects",
                "Download Resume", "/resume/Mohammad_Rehan_Jirayat_Resume.pdf",
                "About", "Building toward thoughtful Java backend development.",
                "I'm Mohammad Rehan Jirayat, an MCA student and Java Backend Developer focused on building practical backend systems with Java, Spring Boot, REST APIs, and database-driven application design.",
                "My development journey includes Core Java, JDBC, MySQL, layered architecture, Spring Data JPA, Spring Security, testing, and clean backend engineering through hands-on project work.",
                "Explore my projects", "#projects",
                "Contact", "Have a question or want to work together? Send me a message and I'll get back to you.",
                "Mohammad Rehan Jirayat", "Copyright",
                write(List.of(
                        new SiteContentResponse.NavigationItem("Home", "#home", false, true, 0),
                        new SiteContentResponse.NavigationItem("About", "#about", false, true, 1),
                        new SiteContentResponse.NavigationItem("Skills", "#skills", false, true, 2),
                        new SiteContentResponse.NavigationItem("Projects", "#projects", false, true, 3),
                        new SiteContentResponse.NavigationItem("Education", "#education", false, true, 4),
                        new SiteContentResponse.NavigationItem("Certifications", "#certifications", false, true, 5),
                        new SiteContentResponse.NavigationItem("GitHub", "https://github.com/rehanjirayat-hub", true, true, 6),
                        new SiteContentResponse.NavigationItem("Resume", "#resume", false, true, 7),
                        new SiteContentResponse.NavigationItem("Contact", "#contact", false, true, 8))),
                write(List.of(
                        new SiteContentResponse.SectionSetting("home", true, 0),
                        new SiteContentResponse.SectionSetting("about", true, 1),
                        new SiteContentResponse.SectionSetting("skills", true, 2),
                        new SiteContentResponse.SectionSetting("projects", true, 3),
                        new SiteContentResponse.SectionSetting("experience", true, 4),
                        new SiteContentResponse.SectionSetting("education", true, 5),
                        new SiteContentResponse.SectionSetting("certifications", true, 6),
                        new SiteContentResponse.SectionSetting("resume", true, 7),
                        new SiteContentResponse.SectionSetting("contact", true, 8))),
                "Mohammad Rehan Jirayat", "Java Backend Developer");
    }

    public SiteContentResponse toResponse(SiteContent content) {
        return new SiteContentResponse(content.getHeroSubtitle(), content.getHeroPrimaryCtaLabel(), content.getHeroPrimaryCtaUrl(),
                content.getHeroSecondaryCtaLabel(), content.getHeroSecondaryCtaUrl(), content.getAboutEyebrow(),
                content.getAboutHeading(), content.getAboutParagraphOne(), content.getAboutParagraphTwo(),
                content.getAboutCtaLabel(), content.getAboutCtaUrl(), content.getContactHeading(), content.getContactDescription(),
                content.getFooterDescription(), content.getCopyrightText(), content.getSiteName(), content.getProfessionalTitle(),
                read(content.getNavigationJson(), new TypeReference<>() {}), read(content.getSectionsJson(), new TypeReference<>() {}));
    }

    private <T> String write(T value) {
        try { return objectMapper.writeValueAsString(value); }
        catch (JsonProcessingException exception) { throw new IllegalStateException("Could not serialize site content", exception); }
    }

    private <T> List<T> read(String value, TypeReference<List<T>> type) {
        try { return objectMapper.readValue(value, type); }
        catch (JsonProcessingException exception) { throw new IllegalStateException("Could not read site content", exception); }
    }
}
