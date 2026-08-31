package com.rehanjirayat.portfolio.domain;

import java.io.Serializable;
import java.util.Objects;

public class SocialLinkId implements Serializable {

    private Long profile;
    private String platform;

    public SocialLinkId() {
    }

    public SocialLinkId(Long profile, String platform) {
        this.profile = profile;
        this.platform = platform;
    }

    public Long getProfile() {
        return profile;
    }

    public String getPlatform() {
        return platform;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SocialLinkId that = (SocialLinkId) o;
        return Objects.equals(profile, that.profile) && Objects.equals(platform, that.platform);
    }

    @Override
    public int hashCode() {
        return Objects.hash(profile, platform);
    }
}
