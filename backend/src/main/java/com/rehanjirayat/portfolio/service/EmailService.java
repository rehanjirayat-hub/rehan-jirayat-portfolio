package com.rehanjirayat.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final String RESEND_API_URL = "https://api.resend.com/emails";
    private static final String FROM_EMAIL = "onboarding@resend.dev";

    private final RestClient restClient;

    @Value("${contact.notification-email:}")
    private String notificationEmail;

    @Value("${RESEND_API_KEY:}")
    private String resendApiKey;

    public EmailService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl(RESEND_API_URL)
                .build();
    }

    @Async
    public void sendContactNotification(String name, String email, String subject, String message) {
        if (notificationEmail == null || notificationEmail.isBlank()) {
            log.warn("Contact notification email is not configured — skipping email send");
            return;
        }

        if (resendApiKey == null || resendApiKey.isBlank()) {
            log.warn("RESEND_API_KEY is not configured — skipping email send");
            return;
        }

        try {
            Map<String, Object> body = Map.of(
                    "from", FROM_EMAIL,
                    "to", List.of(notificationEmail),
                    "subject", "New Contact Message: " + subject,
                    "html", buildEmailHtml(name, email, subject, message)
            );

            ResponseEntity<Void> response = restClient.post()
                    .header("Authorization", "Bearer " + resendApiKey)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();

            log.info("Contact notification email sent successfully to {}", notificationEmail);
        } catch (Exception e) {
            log.error("Failed to send contact notification email: {}", e.getMessage());
        }
    }

    private String buildEmailHtml(String name, String email, String subject, String message) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                        .header { background-color: #1a1a2e; color: #ffffff; padding: 24px; text-align: center; }
                        .header h1 { margin: 0; font-size: 20px; }
                        .content { padding: 24px; }
                        .field { margin-bottom: 16px; }
                        .field-label { font-weight: bold; color: #333; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
                        .field-value { color: #555; font-size: 15px; line-height: 1.5; padding: 8px 12px; background-color: #f9f9f9; border-radius: 4px; }
                        .field-value.message { white-space: pre-wrap; }
                        .footer { padding: 16px 24px; background-color: #f9f9f9; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Message</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="field-label">Name</div>
                                <div class="field-value">%s</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Email</div>
                                <div class="field-value"><a href="mailto:%s">%s</a></div>
                            </div>
                            <div class="field">
                                <div class="field-label">Subject</div>
                                <div class="field-value">%s</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Message</div>
                                <div class="field-value message">%s</div>
                            </div>
                        </div>
                        <div class="footer">
                            This message was sent via the portfolio contact form.
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                escapeHtml(name),
                escapeHtml(email),
                escapeHtml(email),
                escapeHtml(subject),
                escapeHtml(message)
        );
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
