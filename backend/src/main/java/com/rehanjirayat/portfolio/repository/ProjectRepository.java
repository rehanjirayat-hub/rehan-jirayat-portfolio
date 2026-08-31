package com.rehanjirayat.portfolio.repository;

import com.rehanjirayat.portfolio.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, String> {
}
