package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Education;
import com.rehanjirayat.portfolio.dto.AdminEducationRequest;
import com.rehanjirayat.portfolio.repository.EducationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminEducationService {

    private final EducationRepository repository;

    public AdminEducationService(EducationRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Education save(AdminEducationRequest request) {
        Education education = repository.findById(request.id())
                .orElseGet(() -> new Education(request.id(), request.degree(), request.institution(), request.university(),
                        request.location(), request.startYear(), request.endYear(), request.expectedEndYear(),
                        request.status(), request.cgpa(), request.website()));
        education.updateContent(request.degree(), request.institution(), request.university(), request.location(),
                request.startYear(), request.endYear(), request.expectedEndYear(), request.status(), request.cgpa(), request.website());
        return repository.save(education);
    }

    public List<Education> findAll() {
        return repository.findAll();
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}