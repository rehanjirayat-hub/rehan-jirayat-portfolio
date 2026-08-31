package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "project_technologies")
@IdClass(ProjectTechnologyId.class)
public class ProjectTechnology {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Id
    @Column(nullable = false, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TechnologyCategory category;

    protected ProjectTechnology() {
    }

    public ProjectTechnology(String name, TechnologyCategory category) {
        this.name = name;
        this.category = category;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getName() {
        return name;
    }

    public TechnologyCategory getCategory() {
        return category;
    }
}
