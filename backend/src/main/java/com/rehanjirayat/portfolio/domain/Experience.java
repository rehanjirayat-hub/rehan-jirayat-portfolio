package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String jobTitle;

    @Column(nullable = false, length = 200)
    private String company;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, length = 20)
    private String startDate;

    @Column(length = 20)
    private String endDate;

    @Column(nullable = false)
    private boolean current;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 10)
    private int displayOrder;

    @Column(length = 500)
    private String companyUrl;

    private Boolean visible = true;

    protected Experience() {
    }

    public Experience(String jobTitle, String company, String location, String startDate,
                      String endDate, boolean current, String description, int displayOrder,
                      String companyUrl, Boolean visible) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.current = current;
        this.description = description;
        this.displayOrder = displayOrder;
        this.companyUrl = companyUrl;
        this.visible = visible;
    }

    public Long getId() { return id; }
    public String getJobTitle() { return jobTitle; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getStartDate() { return startDate; }
    public String getEndDate() { return endDate; }
    public boolean isCurrent() { return current; }
    public String getDescription() { return description; }
    public int getDisplayOrder() { return displayOrder; }
    public String getCompanyUrl() { return companyUrl; }
    public boolean isVisible() { return visible == null || visible; }

    public void update(String jobTitle, String company, String location, String startDate,
                       String endDate, boolean current, String description, int displayOrder,
                       String companyUrl, Boolean visible) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.current = current;
        this.description = description;
        this.displayOrder = displayOrder;
        this.companyUrl = companyUrl;
        this.visible = visible;
    }
}
