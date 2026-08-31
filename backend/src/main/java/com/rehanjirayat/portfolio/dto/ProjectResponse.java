package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.Project;
import com.rehanjirayat.portfolio.domain.ProjectTechnology;

import java.util.List;

public record ProjectResponse(
        String id,
        String name,
        String description,
        String status,
        List<TechnologyDto> technologies,
        String githubUrl,
        String overview,
        String architecture,
        String testing
) {
    public record TechnologyDto(
            String name,
            String category
    ) {}

    public static ProjectResponse fromProject(Project project) {
        List<TechnologyDto> techs = project.getTechnologies().stream()
                .map(t -> new TechnologyDto(t.getName(),
                        t.getCategory() != null ? t.getCategory().name() : null))
                .toList();

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStatus(),
                techs,
                project.getGithubUrl(),
                project.getOverview(),
                project.getArchitecture(),
                project.getTesting()
        );
    }
}
