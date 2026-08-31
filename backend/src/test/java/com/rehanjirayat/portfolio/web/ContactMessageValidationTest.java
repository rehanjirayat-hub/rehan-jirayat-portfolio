package com.rehanjirayat.portfolio.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rehanjirayat.portfolio.config.ContactRateLimiter;
import com.rehanjirayat.portfolio.config.ContactRateLimitFilter;
import com.rehanjirayat.portfolio.service.ContactMessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactMessageController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {
        "rate-limit.max-requests=100",
        "rate-limit.window-minutes=15"
})
class ContactMessageValidationTest {

    @Autowired private MockMvc mockMvc;
    @MockitoBean private ContactMessageService contactMessageService;
    @Autowired private ObjectMapper objectMapper;

    private String toJson(Object obj) throws Exception {
        return objectMapper.writeValueAsString(obj);
    }

    private String validBody() throws Exception {
        return toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John Doe", "john@example.com", "Hello", "This is a valid test message body"));
    }

    // --- Valid request ---

    @Test
    void validRequest_returnsCreated() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validBody()))
                .andExpect(status().isCreated());

        verify(contactMessageService).save(any());
    }

    // --- Name validation ---

    @Test
    void missingName_returnsBadRequest() throws Exception {
        String body = toJson(new java.util.LinkedHashMap<>() {{
            put("email", "j@test.com");
            put("subject", "Hi");
            put("message", "Valid message body here");
        }});
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors").isArray());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void blankName_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "", "j@test.com", "Hi", "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void nameExceedingMaxLength_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "a".repeat(101), "j@test.com", "Hi", "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    // --- Email validation ---

    @Test
    void missingEmail_returnsBadRequest() throws Exception {
        String body = toJson(new java.util.LinkedHashMap<>() {{
            put("name", "John");
            put("subject", "Hi");
            put("message", "Valid message body here");
        }});
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void invalidEmail_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "not-an-email", "Hi", "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void blankEmail_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "", "Hi", "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void emailExceedingMaxLength_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "a".repeat(141) + "@test.com", "Hi", "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    // --- Subject validation ---

    @Test
    void missingSubject_returnsBadRequest() throws Exception {
        String body = toJson(new java.util.LinkedHashMap<>() {{
            put("name", "John");
            put("email", "j@test.com");
            put("message", "Valid message body here");
        }});
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void blankSubject_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "j@test.com", "", "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void subjectExceedingMaxLength_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "j@test.com", "a".repeat(201), "Valid message body here"));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    // --- Message validation ---

    @Test
    void missingMessage_returnsBadRequest() throws Exception {
        String body = toJson(new java.util.LinkedHashMap<>() {{
            put("name", "John");
            put("email", "j@test.com");
            put("subject", "Hi");
        }});
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void blankMessage_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "j@test.com", "Hi", ""));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void messageExceedingMaxLength_returnsBadRequest() throws Exception {
        String body = toJson(new com.rehanjirayat.portfolio.dto.ContactMessageRequest(
                "John", "j@test.com", "Hi", "a".repeat(5001)));
        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    // --- Body parsing ---

    @Test
    void missingRequestBody_returnsBadRequest() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    @Test
    void malformedJson_returnsBadRequest() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{bad json}"))
                .andExpect(status().isBadRequest());
        verify(contactMessageService, never()).save(any());
    }

    // --- Response format ---

    @Test
    void validationError_hasStructuredResponse() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value("about:blank"))
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.errors").isArray());
    }
}
