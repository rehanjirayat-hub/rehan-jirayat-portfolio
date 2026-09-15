package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "site_resume")
public class SiteResume {

    public static final String ACTIVE_ID = "active";

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "public_id", nullable = false, unique = true)
    private String publicId;

    @Column(name = "secure_url", nullable = false, length = 1024)
    private String secureUrl;

    @Column(name = "original_filename")
    private String originalFilename;

    @Column(nullable = false)
    private Long bytes;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    protected SiteResume() {
    }

    public SiteResume(String id, String publicId, String secureUrl,
                      String originalFilename, Long bytes) {
        this.id = id;
        this.publicId = publicId;
        this.secureUrl = secureUrl;
        this.originalFilename = originalFilename;
        this.bytes = bytes;
        this.updatedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public String getPublicId() { return publicId; }
    public String getSecureUrl() { return secureUrl; }
    public String getOriginalFilename() { return originalFilename; }
    public Long getBytes() { return bytes; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
