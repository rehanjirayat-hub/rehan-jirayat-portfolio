package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "profile_social_links")
@IdClass(SocialLinkId.class)
public class SocialLink {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Id
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

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
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
