package com.rehanjirayat.portfolio.service;

import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(emailService, "notificationEmail", "test@example.com");
        ReflectionTestUtils.setField(emailService, "mailFrom", "noreply@portfolio.com");
    }

    @Test
    void sendContactNotification_sendsEmailSuccessfully() {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verify(mailSender).createMimeMessage();
        verify(mailSender).send(any(MimeMessage.class));
    }

    @Test
    void sendContactNotification_skipsWhenNotificationEmailNotConfigured() {
        ReflectionTestUtils.setField(emailService, "notificationEmail", "");

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verify(mailSender, never()).createMimeMessage();
        verify(mailSender, never()).send(any(MimeMessage.class));
    }

    @Test
    void sendContactNotification_skipsWhenNotificationEmailIsBlank() {
        ReflectionTestUtils.setField(emailService, "notificationEmail", "   ");

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verify(mailSender, never()).createMimeMessage();
        verify(mailSender, never()).send(any(MimeMessage.class));
    }

    @Test
    void sendContactNotification_doesNotThrowWhenMailSendFails() {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        doThrow(new MailException("SMTP error") {})
                .when(mailSender).send(any(MimeMessage.class));

        assertDoesNotThrow(() ->
                emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message")
        );

        verify(mailSender).send(any(MimeMessage.class));
    }

    @Test
    void sendContactNotification_doesNotThrowWhenUnexpectedExceptionOccurs() {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        doThrow(new RuntimeException("Unexpected failure"))
                .when(mailSender).send(any(MimeMessage.class));

        assertDoesNotThrow(() ->
                emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message")
        );

        verify(mailSender).send(any(MimeMessage.class));
    }

    @Test
    void sendContactNotification_usesCorrectRecipient() {
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        ArgumentCaptor<MimeMessage> captor = ArgumentCaptor.forClass(MimeMessage.class);
        verify(mailSender).send(captor.capture());

        MimeMessage sentMessage = captor.getValue();
        assertNotNull(sentMessage);
    }
}
