package com.rehanjirayat.portfolio.service;

import com.cloudinary.Cloudinary;
import com.rehanjirayat.portfolio.domain.MediaAsset;
import com.rehanjirayat.portfolio.dto.MediaResponse;
import com.rehanjirayat.portfolio.repository.MediaAssetRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Application-level media management: uploads to Cloudinary via
 * {@link MediaStorageService} and persists lightweight metadata locally.
 */
@Service
public class MediaService {

    private final MediaStorageService storage;
    private final MediaAssetRepository repository;

    public MediaService(MediaStorageService storage, MediaAssetRepository repository) {
        this.storage = storage;
        this.repository = repository;
    }

    public boolean isStorageConfigured() {
        return storage.isConfigured();
    }

    public List<MediaResponse> findAll() {
        return repository.findAll().stream()
                .sorted((a, b) -> {
                    if (a.getCreatedAt() == null || b.getCreatedAt() == null) return 0;
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                })
                .map(MediaResponse::fromAsset)
                .toList();
    }

    @Transactional
    public MediaResponse uploadImage(MultipartFile file) throws IOException {
        Map<?, ?> result = storage.uploadImage(file);
        MediaAsset asset = new MediaAsset(
                String.valueOf(result.get("public_id")),
                String.valueOf(result.get("resource_type")),
                String.valueOf(result.get("format")),
                file.getOriginalFilename(),
                String.valueOf(result.get("secure_url")),
                intOrNull(result.get("width")),
                intOrNull(result.get("height")),
                longOrNull(result.get("bytes")));
        return MediaResponse.fromAsset(repository.save(asset));
    }

    @Transactional
    public void delete(Long id) {
        MediaAsset asset = repository.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Media not found"));
        try {
            storage.destroy(asset.getPublicId(), asset.getResourceType());
        } catch (IOException exception) {
            throw new IllegalStateException("Could not delete the file from media storage.", exception);
        }
        repository.delete(asset);
    }

    private Integer intOrNull(Object value) {
        return value instanceof Number number ? Integer.valueOf(number.intValue()) : null;
    }

    private Long longOrNull(Object value) {
        return value instanceof Number number ? Long.valueOf(number.longValue()) : null;
    }
}
