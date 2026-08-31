package com.rehanjirayat.portfolio.domain;

import java.io.Serializable;
import java.util.Objects;

public class ProjectTechnologyId implements Serializable {

    private String project;
    private String name;

    public ProjectTechnologyId() {
    }

    public ProjectTechnologyId(String project, String name) {
        this.project = project;
        this.name = name;
    }

    public String getProject() {
        return project;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectTechnologyId that = (ProjectTechnologyId) o;
        return Objects.equals(project, that.project) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(project, name);
    }
}
