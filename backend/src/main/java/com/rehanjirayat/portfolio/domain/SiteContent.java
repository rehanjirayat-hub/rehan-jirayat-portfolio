package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "site_content")
public class SiteContent {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 150)
    private String heroSubtitle;

    @Column(nullable = false, length = 300)
    private String heroPrimaryCtaLabel;

    @Column(nullable = false, length = 500)
    private String heroPrimaryCtaUrl;

    @Column(nullable = false, length = 300)
    private String heroSecondaryCtaLabel;

    @Column(nullable = false, length = 500)
    private String heroSecondaryCtaUrl;

    @Column(nullable = false, length = 150)
    private String aboutEyebrow;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String aboutHeading;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String aboutParagraphOne;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String aboutParagraphTwo;

    @Column(nullable = false, length = 200)
    private String aboutCtaLabel;

    @Column(nullable = false, length = 500)
    private String aboutCtaUrl;

    @Column(nullable = false, length = 200)
    private String contactHeading;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contactDescription;

    @Column(nullable = false, length = 200)
    private String footerDescription;

    @Column(nullable = false, length = 200)
    private String copyrightText;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String navigationJson;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sectionsJson;

    @Column(nullable = false, length = 200)
    private String siteName;

    @Column(nullable = false, length = 200)
    private String professionalTitle;

    protected SiteContent() {
    }

    public SiteContent(String id, String heroSubtitle, String heroPrimaryCtaLabel, String heroPrimaryCtaUrl,
                       String heroSecondaryCtaLabel, String heroSecondaryCtaUrl, String aboutEyebrow,
                       String aboutHeading, String aboutParagraphOne, String aboutParagraphTwo,
                       String aboutCtaLabel, String aboutCtaUrl, String contactHeading, String contactDescription,
                       String footerDescription, String copyrightText, String navigationJson, String sectionsJson,
                       String siteName, String professionalTitle) {
        this.id = id;
        this.heroSubtitle = heroSubtitle;
        this.heroPrimaryCtaLabel = heroPrimaryCtaLabel;
        this.heroPrimaryCtaUrl = heroPrimaryCtaUrl;
        this.heroSecondaryCtaLabel = heroSecondaryCtaLabel;
        this.heroSecondaryCtaUrl = heroSecondaryCtaUrl;
        this.aboutEyebrow = aboutEyebrow;
        this.aboutHeading = aboutHeading;
        this.aboutParagraphOne = aboutParagraphOne;
        this.aboutParagraphTwo = aboutParagraphTwo;
        this.aboutCtaLabel = aboutCtaLabel;
        this.aboutCtaUrl = aboutCtaUrl;
        this.contactHeading = contactHeading;
        this.contactDescription = contactDescription;
        this.footerDescription = footerDescription;
        this.copyrightText = copyrightText;
        this.navigationJson = navigationJson;
        this.sectionsJson = sectionsJson;
        this.siteName = siteName;
        this.professionalTitle = professionalTitle;
    }

    public String getId() { return id; }
    public String getHeroSubtitle() { return heroSubtitle; }
    public String getHeroPrimaryCtaLabel() { return heroPrimaryCtaLabel; }
    public String getHeroPrimaryCtaUrl() { return heroPrimaryCtaUrl; }
    public String getHeroSecondaryCtaLabel() { return heroSecondaryCtaLabel; }
    public String getHeroSecondaryCtaUrl() { return heroSecondaryCtaUrl; }
    public String getAboutEyebrow() { return aboutEyebrow; }
    public String getAboutHeading() { return aboutHeading; }
    public String getAboutParagraphOne() { return aboutParagraphOne; }
    public String getAboutParagraphTwo() { return aboutParagraphTwo; }
    public String getAboutCtaLabel() { return aboutCtaLabel; }
    public String getAboutCtaUrl() { return aboutCtaUrl; }
    public String getContactHeading() { return contactHeading; }
    public String getContactDescription() { return contactDescription; }
    public String getFooterDescription() { return footerDescription; }
    public String getCopyrightText() { return copyrightText; }
    public String getNavigationJson() { return navigationJson; }
    public String getSectionsJson() { return sectionsJson; }
    public String getSiteName() { return siteName; }
    public String getProfessionalTitle() { return professionalTitle; }

    public void update(String heroSubtitle, String heroPrimaryCtaLabel, String heroPrimaryCtaUrl,
                       String heroSecondaryCtaLabel, String heroSecondaryCtaUrl, String aboutEyebrow,
                       String aboutHeading, String aboutParagraphOne, String aboutParagraphTwo,
                       String aboutCtaLabel, String aboutCtaUrl, String contactHeading, String contactDescription,
                       String footerDescription, String copyrightText, String navigationJson, String sectionsJson,
                       String siteName, String professionalTitle) {
        this.heroSubtitle = heroSubtitle;
        this.heroPrimaryCtaLabel = heroPrimaryCtaLabel;
        this.heroPrimaryCtaUrl = heroPrimaryCtaUrl;
        this.heroSecondaryCtaLabel = heroSecondaryCtaLabel;
        this.heroSecondaryCtaUrl = heroSecondaryCtaUrl;
        this.aboutEyebrow = aboutEyebrow;
        this.aboutHeading = aboutHeading;
        this.aboutParagraphOne = aboutParagraphOne;
        this.aboutParagraphTwo = aboutParagraphTwo;
        this.aboutCtaLabel = aboutCtaLabel;
        this.aboutCtaUrl = aboutCtaUrl;
        this.contactHeading = contactHeading;
        this.contactDescription = contactDescription;
        this.footerDescription = footerDescription;
        this.copyrightText = copyrightText;
        this.navigationJson = navigationJson;
        this.sectionsJson = sectionsJson;
        this.siteName = siteName;
        this.professionalTitle = professionalTitle;
    }
}
