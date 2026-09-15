package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.ResumeStatusResponse;
import com.rehanjirayat.portfolio.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/** Admin-only resume management. Protected by /api/admin/** security rules. */
@RestController
@RequestMapping("/api/admin/resume")
public class AdminResumeController {

    private final ResumeService resumeService;

    public AdminResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResumeStatusResponse status() {
        return resumeService.getStatus();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeStatusResponse> upload(@RequestPart("file") MultipartFile file) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeService.upload(file));
    }

    @DeleteMapping
    public ResponseEntity<Void> remove() {
        resumeService.remove();
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<Map<String, String>> handleUploadErrors(RuntimeException exception) {
        return ResponseEntity.badRequest().body(Map.of("message", exception.getMessage()));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> handleTooLarge(MaxUploadSizeExceededException exception) {
        return ResponseEntity.status(413)
                .body(Map.of("message", "File is too large. Maximum resume size is 10 MB."));
    }
}
