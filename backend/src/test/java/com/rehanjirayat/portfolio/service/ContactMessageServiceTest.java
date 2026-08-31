package com.rehanjirayat.portfolio.service;

import com.rehanjirayat.portfolio.domain.ContactMessage;
import com.rehanjirayat.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactMessageServiceTest {

    @Mock
    private ContactMessageRepository repository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ContactMessageService contactMessageService;

    private ContactMessage contactMessage;

    @BeforeEach
    void setUp() {
        contactMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "Test message body");
    }

    @Test
    void save_persistsMessageToDatabase() {
        ContactMessage savedMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "Test message body");
        when(repository.save(any(ContactMessage.class))).thenReturn(savedMessage);

        ContactMessage result = contactMessageService.save(contactMessage);

        assertNotNull(result);
        verify(repository).save(contactMessage);
    }

    @Test
    void save_sendsEmailNotificationAfterSaving() {
        ContactMessage savedMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "Test message body");
        when(repository.save(any(ContactMessage.class))).thenReturn(savedMessage);

        contactMessageService.save(contactMessage);

        verify(emailService).sendContactNotification("John Doe", "john@example.com", "Hello", "Test message body");
    }

    @Test
    void save_returnsSavedMessageEvenWhenEmailFails() {
        ContactMessage savedMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "Test message body");
        when(repository.save(any(ContactMessage.class))).thenReturn(savedMessage);
        doThrow(new RuntimeException("SMTP error")).when(emailService)
                .sendContactNotification(anyString(), anyString(), anyString(), anyString());

        ContactMessage result = contactMessageService.save(contactMessage);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("john@example.com", result.getEmail());
        verify(repository).save(contactMessage);
    }

    @Test
    void save_doesNotThrowWhenEmailServiceThrowsException() {
        ContactMessage savedMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "Test message body");
        when(repository.save(any(ContactMessage.class))).thenReturn(savedMessage);
        doThrow(new RuntimeException("SMTP connection failed")).when(emailService)
                .sendContactNotification(anyString(), anyString(), anyString(), anyString());

        assertDoesNotThrow(() -> contactMessageService.save(contactMessage));
    }

    @Test
    void save_alwaysCallsRepositoryFirst() {
        ContactMessage savedMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "Test message body");
        when(repository.save(any(ContactMessage.class))).thenReturn(savedMessage);
        doThrow(new RuntimeException("SMTP error")).when(emailService)
                .sendContactNotification(anyString(), anyString(), anyString(), anyString());

        contactMessageService.save(contactMessage);

        var inOrder = inOrder(repository, emailService);
        inOrder.verify(repository).save(contactMessage);
        inOrder.verify(emailService).sendContactNotification(
                "John Doe", "john@example.com", "Hello", "Test message body");
    }
}
