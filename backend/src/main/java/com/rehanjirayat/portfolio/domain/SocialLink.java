package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Embeddable
public class SocialLink {

    @Column(nullable = false, length = 20)
    private String platform;

    @Column(nullable = false, length = 200)
    private String href;

    @Column(nullable = false, length = 100)
    private String label;

    protected SocialLink() {
    }

    public SocialLink(String platform, String href, String label) {
        this.platform = platform;
        this.href = href;
        this.label = label;
    }

    public String getPlatform() {
        return platform;
    }

    public String getHref() {
        return href;
    }

    public String getLabel() {
        return label;
    }
}
