package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 200)
    private String organization;

    @Column(length = 50)
    private String date;

    @Column(length = 500)
    private String credentialUrl;

    protected Certification() {
    }

    public Certification(String id, String name, String organization,
                         String date, String credentialUrl) {
        this.id = id;
        this.name = name;
        this.organization = organization;
        this.date = date;
        this.credentialUrl = credentialUrl;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getOrganization() {
        return organization;
    }

    public String getDate() {
        return date;
    }

    public String getCredentialUrl() {
        return credentialUrl;
    }
}
