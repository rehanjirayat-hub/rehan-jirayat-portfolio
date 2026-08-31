package com.rehanjirayat.portfolio.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Answers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestClient;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock(answer = Answers.RETURNS_DEEP_STUBS)
    private RestClient restClient;

    private EmailService emailService;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = mock(RestClient.Builder.class);
        when(builder.baseUrl(anyString())).thenReturn(builder);
        when(builder.build()).thenReturn(restClient);

        emailService = new EmailService(builder);

        ReflectionTestUtils.setField(emailService, "notificationEmail", "test@example.com");
        ReflectionTestUtils.setField(emailService, "resendApiKey", "re_test_key_123");
    }

    @Test
    void sendContactNotification_sendsEmailSuccessfully() {
        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verify(restClient).post();
    }

    @Test
    void sendContactNotification_skipsWhenNotificationEmailNotConfigured() {
        ReflectionTestUtils.setField(emailService, "notificationEmail", "");

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verifyNoInteractions(restClient);
    }

    @Test
    void sendContactNotification_skipsWhenNotificationEmailIsBlank() {
        ReflectionTestUtils.setField(emailService, "notificationEmail", "   ");

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verifyNoInteractions(restClient);
    }

    @Test
    void sendContactNotification_skipsWhenApiKeyNotConfigured() {
        ReflectionTestUtils.setField(emailService, "resendApiKey", "");

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verifyNoInteractions(restClient);
    }

    @Test
    void sendContactNotification_skipsWhenApiKeyIsBlank() {
        ReflectionTestUtils.setField(emailService, "resendApiKey", "   ");

        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verifyNoInteractions(restClient);
    }

    @Test
    void sendContactNotification_doesNotThrowWhenApiCallFails() {
        when(restClient.post().header(anyString(), anyString()).body(any()).retrieve().toBodilessEntity())
                .thenThrow(new RuntimeException("API error"));

        assertDoesNotThrow(() ->
                emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message")
        );
    }

    @Test
    void sendContactNotification_doesNotThrowWhenUnexpectedExceptionOccurs() {
        when(restClient.post()).thenThrow(new RuntimeException("Unexpected failure"));

        assertDoesNotThrow(() ->
                emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message")
        );
    }

    @Test
    void sendContactNotification_sendsToCorrectRecipient() {
        emailService.sendContactNotification("John Doe", "john@example.com", "Hello", "Test message");

        verify(restClient.post()).header(eq("Authorization"), eq("Bearer re_test_key_123"));
    }
}
