package com.rehanjirayat.portfolio.repository;

import com.rehanjirayat.portfolio.domain.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}