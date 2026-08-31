package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Certification;
import com.rehanjirayat.portfolio.dto.CertificationResponse;
import com.rehanjirayat.portfolio.service.CertificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService service;

    public CertificationController(CertificationService service) {
        this.service = service;
    }

    @GetMapping
    public List<CertificationResponse> findAll() {
        return service.findAll().stream()
                .map(CertificationResponse::fromCertification)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificationResponse> findById(@PathVariable String id) {
        Certification cert = service.findById(id);
        return ResponseEntity.ok(CertificationResponse.fromCertification(cert));
    }
}
