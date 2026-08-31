package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Certification;
import com.rehanjirayat.portfolio.repository.CertificationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    private final CertificationRepository repository;

    public CertificationService(CertificationRepository repository) {
        this.repository = repository;
    }

    public List<Certification> findAll() {
        return repository.findAll();
    }

    public Certification findById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Certification not found with id: " + id));
    }
}
