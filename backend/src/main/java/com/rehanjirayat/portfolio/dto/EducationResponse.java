package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.Education;

public record EducationResponse(
        String id,
        String degree,
        String institution,
        String university,
        String location,
        int startYear,
        int endYear,
        Integer expectedEndYear,
        String status,
        int cgpa,
        String website
) {
    public static EducationResponse fromEducation(Education edu) {
        return new EducationResponse(
                edu.getId(),
                edu.getDegree(),
                edu.getInstitution(),
                edu.getUniversity(),
                edu.getLocation(),
                edu.getStartYear(),
                edu.getEndYear(),
                edu.getExpectedEndYear(),
                edu.getStatus(),
                edu.getCgpa(),
                edu.getWebsite()
        );
    }
}
