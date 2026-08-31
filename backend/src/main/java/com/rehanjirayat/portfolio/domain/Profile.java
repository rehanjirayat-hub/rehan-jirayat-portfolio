package com.rehanjirayat.portfolio.domain;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String role;

    @Column(nullable = false, length = 200)
    private String specialization;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String heroStatement;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "profile_social_links",
        joinColumns = @JoinColumn(name = "profile_id")
    )
    private List<SocialLink> socialLinks = new ArrayList<>();

    protected Profile() {
    }

    public Profile(String name, String role, String specialization,
                   String location, String email, String phone, String heroStatement) {
        this.name = name;
        this.role = role;
        this.specialization = specialization;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.heroStatement = heroStatement;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getLocation() {
        return location;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getHeroStatement() {
        return heroStatement;
    }

    public List<SocialLink> getSocialLinks() {
        return socialLinks;
    }
}
