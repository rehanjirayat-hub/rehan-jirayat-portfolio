package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Education;
import com.rehanjirayat.portfolio.repository.EducationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository repository;

    public EducationService(EducationRepository repository) {
        this.repository = repository;
    }

    public List<Education> findAll() {
        return repository.findAll();
    }

    public Education findById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Education not found with id: " + id));
    }
}
