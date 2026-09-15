package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.Project;
import com.rehanjirayat.portfolio.domain.ProjectTechnology;
import com.rehanjirayat.portfolio.dto.AdminProjectRequest;
import com.rehanjirayat.portfolio.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminProjectService {

    private final ProjectRepository projectRepository;

    public AdminProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public Project save(AdminProjectRequest request) {
        Project project = projectRepository.findById(request.id())
                .orElseGet(() -> new Project(request.id(), request.name(), request.description(), request.status(),
                        request.githubUrl(), request.overview(), request.architecture(), request.testing()));
        project.updateContent(request.name(), request.description(), request.status(), request.githubUrl(),
            request.overview(), request.architecture(), request.testing(), request.imageUrl(),
            request.visible(), request.displayOrder());
        project.getTechnologies().clear();
        if (request.technologies() != null) {
            request.technologies().forEach(technology -> {
                ProjectTechnology entity = new ProjectTechnology(technology.name(), technology.category());
                entity.setProject(project);
                project.getTechnologies().add(entity);
            });
        }
        return projectRepository.save(project);
    }

    @Transactional
    public void delete(String id) {
        projectRepository.deleteById(id);
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }
}