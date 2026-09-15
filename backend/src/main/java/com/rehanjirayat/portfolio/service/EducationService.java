package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Education;
import com.rehanjirayat.portfolio.repository.EducationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Comparator;

@Service
public class EducationService {

    private final EducationRepository repository;

    public EducationService(EducationRepository repository) {
        this.repository = repository;
    }

    public List<Education> findAll() {
        return repository.findAll().stream()
            .filter(Education::isVisible)
            .sorted(Comparator.comparingInt(Education::getDisplayOrder))
            .toList();
    }

    public Education findById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Education not found with id: " + id));
    }
}
