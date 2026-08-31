package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Embeddable
public class ProjectTechnology {

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

    public String getName() {
        return name;
    }

    public TechnologyCategory getCategory() {
        return category;
    }
}
