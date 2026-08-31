package com.rehanjirayat.portfolio.domain;

import java.io.Serializable;
import java.util.Objects;

public class CategorySkillId implements Serializable {

    private String category;
    private String skill;

    public CategorySkillId() {
    }

    public CategorySkillId(String category, String skill) {
        this.category = category;
        this.skill = skill;
    }

    public String getCategory() {
        return category;
    }

    public String getSkill() {
        return skill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategorySkillId that = (CategorySkillId) o;
        return Objects.equals(category, that.category) && Objects.equals(skill, that.skill);
    }

    @Override
    public int hashCode() {
        return Objects.hash(category, skill);
    }
}
