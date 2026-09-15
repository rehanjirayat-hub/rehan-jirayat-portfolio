package com.rehanjirayat.portfolio.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

/**
 * Backend-signed uploads to Cloudinary. The API secret stays server-side only.
 * File type and size validation happens here so the browser can never be trusted.
 */
@Service
public class MediaStorageService {

    public static final long MAX_IMAGE_BYTES = 5L * 1024 * 1024;   // 5 MB
    public static final long MAX_PDF_BYTES = 10L * 1024 * 1024;    // 10 MB

    private static final Set<String> ALLOWED_IMAGE_TYPES =
            Set.of("image/jpeg", "image/png", "image/webp", "image/gif");
    private static final String ALLOWED_PDF_TYPE = "application/pdf";

    private final Cloudinary cloudinary;

    @Value("${cloudinary.cloud-name:}")
    private String cloudName;

    public MediaStorageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public boolean isConfigured() {
        return cloudName != null && !cloudName.isBlank();
    }

    public Map<?, ?> uploadImage(MultipartFile file) throws IOException {
        requireConfigured();
        validateNotEmpty(file);
        validateSize(file, MAX_IMAGE_BYTES, "Image");
        validateType(file, ALLOWED_IMAGE_TYPES, "Image must be a JPEG, PNG, WebP, or GIF");
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "image", "folder", "portfolio/media"));
    }

    public Map<?, ?> uploadResumePdf(MultipartFile file) throws IOException {
        requireConfigured();
        validateNotEmpty(file);
        validateSize(file, MAX_PDF_BYTES, "Resume");
        validateType(file, Set.of(ALLOWED_PDF_TYPE), "Resume must be a PDF file");
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "raw", "folder", "portfolio/resume"));
    }

    public void destroy(String publicId, String resourceType) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", resourceType));
    }

    private void requireConfigured() {
        if (!isConfigured()) {
            throw new IllegalStateException(
                    "Media storage is not configured. Set the Cloudinary environment variables.");
        }
    }

    private void validateNotEmpty(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please choose a file to upload.");
        }
    }

    private void validateSize(MultipartFile file, long maxBytes, String label) {
        if (file.getSize() > maxBytes) {
            throw new IllegalArgumentException(
                    label + " is too large. Maximum size is " + (maxBytes / (1024 * 1024)) + " MB.");
        }
    }

    private void validateType(MultipartFile file, Set<String> allowed, String message) {
        String contentType = file.getContentType();
        if (contentType == null || !allowed.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException(message);
        }
    }
}
