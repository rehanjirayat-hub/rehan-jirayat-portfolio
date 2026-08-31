package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.ContactMessage;
import com.rehanjirayat.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private static final Logger log = LoggerFactory.getLogger(ContactMessageService.class);

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactMessageService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    public ContactMessage save(ContactMessage contactMessage) {
        ContactMessage saved = repository.save(contactMessage);
        log.info("Contact message saved with id: {}", saved.getId());

        try {
            emailService.sendContactNotification(
                    saved.getName(),
                    saved.getEmail(),
                    saved.getSubject(),
                    saved.getMessage()
            );
        } catch (Exception e) {
            log.error("Email notification failed for contact message id {}: {}", saved.getId(), e.getMessage());
        }

        return saved;
    }
}