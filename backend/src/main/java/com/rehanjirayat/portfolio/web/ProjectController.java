package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Project;
import com.rehanjirayat.portfolio.dto.ProjectResponse;
import com.rehanjirayat.portfolio.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProjectResponse> findAll() {
        return service.findAll().stream()
                .map(ProjectResponse::fromProject)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> findById(@PathVariable String id) {
        Project project = service.findById(id);
        return ResponseEntity.ok(ProjectResponse.fromProject(project));
    }
}
