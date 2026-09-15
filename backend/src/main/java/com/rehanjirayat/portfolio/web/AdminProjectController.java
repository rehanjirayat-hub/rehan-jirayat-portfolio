package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Project;
import com.rehanjirayat.portfolio.dto.AdminProjectRequest;
import com.rehanjirayat.portfolio.dto.ProjectResponse;
import com.rehanjirayat.portfolio.service.AdminProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
public class AdminProjectController {

    private final AdminProjectService service;

    public AdminProjectController(AdminProjectService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProjectResponse> findAll() {
        return service.findAll().stream().map(ProjectResponse::fromProject).toList();
    }

    @PutMapping("/{id}")
    public ProjectResponse save(@PathVariable String id, @Valid @RequestBody AdminProjectRequest request) {
        if (!id.equals(request.id())) {
            throw new IllegalArgumentException("Project id does not match the request path");
        }
        return ProjectResponse.fromProject(service.save(request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}