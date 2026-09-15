package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "media_assets")
public class MediaAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id", nullable = false, unique = true)
    private String publicId;

    @Column(name = "resource_type", nullable = false, length = 20)
    private String resourceType;

    @Column(nullable = false, length = 20)
    private String format;

    @Column(name = "original_filename")
    private String originalFilename;

    @Column(name = "secure_url", nullable = false, length = 1024)
    private String secureUrl;

    private Integer width;

    private Integer height;

    @Column(nullable = false)
    private Long bytes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    protected MediaAsset() {
    }

    public MediaAsset(String publicId, String resourceType, String format,
                      String originalFilename, String secureUrl,
                      Integer width, Integer height, Long bytes) {
        this.publicId = publicId;
        this.resourceType = resourceType;
        this.format = format;
        this.originalFilename = originalFilename;
        this.secureUrl = secureUrl;
        this.width = width;
        this.height = height;
        this.bytes = bytes;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getPublicId() { return publicId; }
    public String getResourceType() { return resourceType; }
    public String getFormat() { return format; }
    public String getOriginalFilename() { return originalFilename; }
    public String getSecureUrl() { return secureUrl; }
    public Integer getWidth() { return width; }
    public Integer getHeight() { return height; }
    public Long getBytes() { return bytes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
