package com.rehanjirayat.portfolio.repository;

import com.rehanjirayat.portfolio.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
