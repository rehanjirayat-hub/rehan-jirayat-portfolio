package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.MediaAsset;

import java.time.LocalDateTime;

public record MediaResponse(
        Long id,
        String publicId,
        String resourceType,
        String format,
        String originalFilename,
        String secureUrl,
        Integer width,
        Integer height,
        Long bytes,
        LocalDateTime createdAt
) {
    public static MediaResponse fromAsset(MediaAsset asset) {
        return new MediaResponse(asset.getId(), asset.getPublicId(), asset.getResourceType(),
                asset.getFormat(), asset.getOriginalFilename(), asset.getSecureUrl(),
                asset.getWidth(), asset.getHeight(), asset.getBytes(), asset.getCreatedAt());
    }
}
