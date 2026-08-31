package com.rehanjirayat.portfolio.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rehanjirayat.portfolio.domain.ContactMessage;
import com.rehanjirayat.portfolio.dto.ContactMessageRequest;
import com.rehanjirayat.portfolio.service.ContactMessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactMessageController.class)
class ContactMessageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ContactMessageService contactMessageService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void create_returnsCreatedWithSavedMessage() throws Exception {
        ContactMessageRequest request = new ContactMessageRequest(
                "John Doe", "john@example.com", "Hello", "This is a test message with enough length");
        ContactMessage savedMessage = new ContactMessage("John Doe", "john@example.com", "Hello", "This is a test message with enough length");
        when(contactMessageService.save(any(ContactMessage.class))).thenReturn(savedMessage);

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andExpect(jsonPath("$.subject").value("Hello"))
                .andExpect(jsonPath("$.message").value("This is a test message with enough length"));
    }

    @Test
    void create_returnsBadRequestWhenNameIsBlank() throws Exception {
        ContactMessageRequest request = new ContactMessageRequest(
                "", "john@example.com", "Hello", "This is a test message with enough length");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returnsBadRequestWhenEmailIsInvalid() throws Exception {
        ContactMessageRequest request = new ContactMessageRequest(
                "John Doe", "invalid-email", "Hello", "This is a test message with enough length");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returnsBadRequestWhenSubjectIsBlank() throws Exception {
        ContactMessageRequest request = new ContactMessageRequest(
                "John Doe", "john@example.com", "", "This is a test message with enough length");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returnsBadRequestWhenMessageIsBlank() throws Exception {
        ContactMessageRequest request = new ContactMessageRequest(
                "John Doe", "john@example.com", "Hello", "");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returnsBadRequestWhenRequestBodyIsMissing() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returnsBadRequestWhenMessageExceedsMaxLength() throws Exception {
        String longMessage = "a".repeat(5001);
        ContactMessageRequest request = new ContactMessageRequest(
                "John Doe", "john@example.com", "Hello", longMessage);

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}
