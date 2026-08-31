package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_categories")
public class SkillCategory {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 200)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SkillEmphasis emphasis;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "skill_category_skills",
        joinColumns = @JoinColumn(name = "category_id")
    )
    @Column(name = "skill")
    private java.util.List<String> skills = new java.util.ArrayList<>();

    protected SkillCategory() {
    }

    public SkillCategory(String id, String title, String description, SkillEmphasis emphasis) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.emphasis = emphasis;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public SkillEmphasis getEmphasis() {
        return emphasis;
    }

    public java.util.List<String> getSkills() {
        return skills;
    }
}
