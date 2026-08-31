package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.ContactMessage;
import com.rehanjirayat.portfolio.dto.ContactMessageRequest;
import com.rehanjirayat.portfolio.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactMessage create(
            @Valid @RequestBody ContactMessageRequest request) {

        ContactMessage contactMessage = new ContactMessage(
                request.name(),
                request.email(),
                request.subject(),
                request.message()
        );

        return service.save(contactMessage);
    }
}