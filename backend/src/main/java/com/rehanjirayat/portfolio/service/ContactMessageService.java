package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.ContactMessage;
import com.rehanjirayat.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage save(ContactMessage contactMessage) {
        return repository.save(contactMessage);
    }
}