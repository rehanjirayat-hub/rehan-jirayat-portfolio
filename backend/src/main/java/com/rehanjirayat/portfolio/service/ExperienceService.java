package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Experience;
import com.rehanjirayat.portfolio.dto.AdminExperienceRequest;
import com.rehanjirayat.portfolio.repository.ExperienceRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ExperienceService {
    private final ExperienceRepository repository;

    public ExperienceService(ExperienceRepository repository) { this.repository = repository; }

    public List<Experience> findAll() {
        return repository.findAll().stream().filter(Experience::isVisible)
            .sorted(Comparator.comparingInt(Experience::getDisplayOrder)).toList();
    }

    @Transactional
    public Experience save(Long id, AdminExperienceRequest request) {
        Experience experience = id == null
                ? new Experience(request.jobTitle(), request.company(), request.location(), request.startDate(), request.endDate(),
                request.current(), request.description(), request.displayOrder(), request.companyUrl(), request.visible())
                : repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Experience not found"));
        experience.update(request.jobTitle(), request.company(), request.location(), request.startDate(), request.endDate(),
            request.current(), request.description(), request.displayOrder(), request.companyUrl(), request.visible());
        return repository.save(experience);
    }

    @Transactional
    public void delete(Long id) { repository.deleteById(id); }
}
