package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CategorySkill> skills = new ArrayList<>();

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

    public List<CategorySkill> getSkills() {
        return skills;
    }
}
