package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_category_skills")
@IdClass(CategorySkillId.class)
public class CategorySkill {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private SkillCategory category;

    @Id
    @Column(name = "skill", nullable = false, length = 255)
    private String skill;

    protected CategorySkill() {
    }

    public CategorySkill(String skill) {
        this.skill = skill;
    }

    public SkillCategory getCategory() {
        return category;
    }

    public void setCategory(SkillCategory category) {
        this.category = category;
    }

    public String getSkill() {
        return skill;
    }
}
