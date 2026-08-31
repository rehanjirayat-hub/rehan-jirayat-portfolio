package com.rehanjirayat.portfolio.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rehanjirayat.portfolio.domain.ContactMessage;
import com.rehanjirayat.portfolio.dto.ContactMessageRequest;
import com.rehanjirayat.portfolio.service.ContactMessageService;
import com.rehanjirayat.portfolio.web.ContactMessageController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactMessageController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {
        "rate-limit.max-requests=3",
        "rate-limit.window-minutes=15",
        "rate-limit.trust-proxy-headers=true"
})
class ContactRateLimitFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ContactRateLimiter rateLimiter;

    @MockitoBean
    private ContactMessageService contactMessageService;

    @Autowired
    private ObjectMapper objectMapper;

    private ContactMessageRequest validRequest;
    private ContactMessage savedMessage;

    @BeforeEach
    void setUp() {
        rateLimiter.reset();

        validRequest = new ContactMessageRequest(
                "Jane Doe", "jane@example.com", "Test Subject", "This is a valid test message body");
        savedMessage = new ContactMessage(
                "Jane Doe", "jane@example.com", "Test Subject", "This is a valid test message body");
    }

    @Test
    void allowsRequestsUnderLimit() throws Exception {
        when(contactMessageService.save(any(ContactMessage.class))).thenReturn(savedMessage);

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Jane Doe"));

        verify(contactMessageService).save(any(ContactMessage.class));
    }

    @Test
    void returns429WhenLimitExceeded() throws Exception {
        when(contactMessageService.save(any(ContactMessage.class))).thenReturn(savedMessage);

        // Submit 3 requests (at the limit)
        for (int i = 0; i < 3; i++) {
            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validRequest)))
                    .andExpect(status().isCreated());
        }

        // 4th request should be blocked
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.title").value("Rate Limit Exceeded"))
                .andExpect(jsonPath("$.status").value(429))
                .andExpect(jsonPath("$.detail").value(
                        "Too many contact form submissions. Please try again later."));

        // Service should have been called exactly 3 times (the successful ones)
        verify(contactMessageService, times(3)).save(any(ContactMessage.class));
    }

    @Test
    void differentIpsAreTrackedSeparately() throws Exception {
        when(contactMessageService.save(any(ContactMessage.class))).thenReturn(savedMessage);

        // Exhaust IP "192.168.1.1"
        for (int i = 0; i < 3; i++) {
            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validRequest))
                            .header("X-Forwarded-For", "192.168.1.1"))
                    .andExpect(status().isCreated());
        }

        // IP "192.168.1.1" should now be blocked
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "192.168.1.1"))
                .andExpect(status().isTooManyRequests());

        // But a different IP should still be allowed
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "10.0.0.99"))
                .andExpect(status().isCreated());
    }

    @Test
    void validationStillWorksWhenUnderLimit() throws Exception {
        // Blank name should still fail validation even when under rate limit
        ContactMessageRequest badRequest = new ContactMessageRequest(
                "", "jane@example.com", "Test Subject", "This is a valid test message body");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));

        verify(contactMessageService, never()).save(any());
    }

    @Test
    void rateLimitDoesNotAffectNonContactEndpoints() throws Exception {
        // Non-contact POST should not be rate limited
        mockMvc.perform(post("/api/nonexistent")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getRequestsAreNotRateLimited() throws Exception {
        // GET on /api/contact should not return 429 (it may return 405)
        mockMvc.perform(
                org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get("/api/contact"))
                .andExpect(result -> {
                    int status = result.getResponse().getStatus();
                    assert status != 429
                            : "GET should not be rate-limited, but got 429";
                });
    }

    @Test
    void returnsProblemDetailJsonFormat() throws Exception {
        when(contactMessageService.save(any(ContactMessage.class))).thenReturn(savedMessage);

        // Exhaust the limit
        for (int i = 0; i < 3; i++) {
            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validRequest)))
                    .andExpect(status().isCreated());
        }

        // Verify the 429 response is proper ProblemDetail JSON
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isTooManyRequests())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value("about:blank"))
                .andExpect(jsonPath("$.title").value("Rate Limit Exceeded"))
                .andExpect(jsonPath("$.status").value(429))
                .andExpect(jsonPath("$.detail").isNotEmpty());
    }
}
