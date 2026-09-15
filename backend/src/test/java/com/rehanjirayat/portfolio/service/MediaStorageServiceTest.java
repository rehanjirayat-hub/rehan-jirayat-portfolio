package com.rehanjirayat.portfolio.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MediaStorageServiceTest {

    private MediaStorageService service;

    @BeforeEach
    void setUp() {
        service = new MediaStorageService(null); // Cloudinary is never reached on validation failures
        ReflectionTestUtils.setField(service, "cloudName", "test-cloud");
    }

    @Test
    void uploadImage_rejectsEmptyFile() {
        MockMultipartFile empty = new MockMultipartFile("file", new byte[0]);
        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class, () -> service.uploadImage(empty));
        assertTrue(exception.getMessage().contains("choose a file"));
    }

    @Test
    void uploadImage_rejectsOversizedFile() {
        byte[] tooBig = new byte[(int) (MediaStorageService.MAX_IMAGE_BYTES + 1)];
        MockMultipartFile file = new MockMultipartFile("file", "big.png", "image/png", tooBig);
        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class, () -> service.uploadImage(file));
        assertTrue(exception.getMessage().contains("too large"));
    }

    @Test
    void uploadImage_rejectsUnsupportedType() {
        MockMultipartFile file = new MockMultipartFile("file", "malware.exe",
                "application/octet-stream", new byte[10]);
        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class, () -> service.uploadImage(file));
        assertTrue(exception.getMessage().contains("JPEG, PNG, WebP"));
    }

    @Test
    void uploadResumePdf_rejectsNonPdf() {
        MockMultipartFile file = new MockMultipartFile("file", "resume.png",
                "image/png", new byte[10]);
        IllegalArgumentException exception =
                assertThrows(IllegalArgumentException.class, () -> service.uploadResumePdf(file));
        assertTrue(exception.getMessage().contains("PDF"));
    }

    @Test
    void uploadImage_throwsClearErrorWhenNotConfigured() {
        ReflectionTestUtils.setField(service, "cloudName", "");
        MockMultipartFile file = new MockMultipartFile("file", "ok.png", "image/png", new byte[10]);
        IllegalStateException exception =
                assertThrows(IllegalStateException.class, () -> service.uploadImage(file));
        assertTrue(exception.getMessage().contains("not configured"));
    }
}
