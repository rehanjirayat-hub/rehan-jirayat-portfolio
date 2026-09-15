package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.Experience;

public record ExperienceResponse(
        Long id,
        String jobTitle,
        String company,
        String location,
        String startDate,
        String endDate,
        boolean current,
        String description,
        int displayOrder,
        String companyUrl,
        boolean visible
) {
    public static ExperienceResponse fromExperience(Experience experience) {
        return new ExperienceResponse(experience.getId(), experience.getJobTitle(), experience.getCompany(),
                experience.getLocation(), experience.getStartDate(), experience.getEndDate(), experience.isCurrent(),
                experience.getDescription(), experience.getDisplayOrder(), experience.getCompanyUrl(), experience.isVisible());
    }
}
