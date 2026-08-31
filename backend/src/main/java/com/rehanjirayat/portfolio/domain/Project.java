package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 20)
    private String status;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ProjectTechnology> technologies = new ArrayList<>();

    @Column(nullable = false, length = 500)
    private String githubUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String overview;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String architecture;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String testing;

    protected Project() {
    }

    public Project(String id, String name, String description, String status,
                   String githubUrl, String overview, String architecture, String testing) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.githubUrl = githubUrl;
        this.overview = overview;
        this.architecture = architecture;
        this.testing = testing;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public List<ProjectTechnology> getTechnologies() {
        return technologies;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getOverview() {
        return overview;
    }

    public String getArchitecture() {
        return architecture;
    }

    public String getTesting() {
        return testing;
    }
}
