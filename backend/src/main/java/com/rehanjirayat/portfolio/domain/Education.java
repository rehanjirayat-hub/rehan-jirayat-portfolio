package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, length = 200)
    private String degree;

    @Column(nullable = false, length = 300)
    private String institution;

    @Column(length = 300)
    private String university;

    @Column(nullable = false, length = 300)
    private String location;

    @Column(nullable = false)
    private int startYear;

    @Column(nullable = false)
    private int endYear;

    private Integer expectedEndYear;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(nullable = false)
    private int cgpa;

    @Column(length = 500)
    private String website;

    protected Education() {
    }

    public Education(String id, String degree, String institution, String university,
                     String location, int startYear, int endYear, Integer expectedEndYear,
                     String status, int cgpa, String website) {
        this.id = id;
        this.degree = degree;
        this.institution = institution;
        this.university = university;
        this.location = location;
        this.startYear = startYear;
        this.endYear = endYear;
        this.expectedEndYear = expectedEndYear;
        this.status = status;
        this.cgpa = cgpa;
        this.website = website;
    }

    public String getId() {
        return id;
    }

    public String getDegree() {
        return degree;
    }

    public String getInstitution() {
        return institution;
    }

    public String getUniversity() {
        return university;
    }

    public String getLocation() {
        return location;
    }

    public int getStartYear() {
        return startYear;
    }

    public int getEndYear() {
        return endYear;
    }

    public Integer getExpectedEndYear() {
        return expectedEndYear;
    }

    public String getStatus() {
        return status;
    }

    public int getCgpa() {
        return cgpa;
    }

    public String getWebsite() {
        return website;
    }
}
