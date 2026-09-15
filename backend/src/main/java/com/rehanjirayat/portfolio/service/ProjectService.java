package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Project;
import com.rehanjirayat.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Comparator;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> findAll() {
        return repository.findAll().stream()
            .filter(Project::isVisible)
            .sorted(Comparator.comparingInt(Project::getDisplayOrder))
            .toList();
    }

    public Project findById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(
                        "Project not found with id: " + id));
    }
}
