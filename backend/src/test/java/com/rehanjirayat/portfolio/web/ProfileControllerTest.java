package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.domain.Profile;
import com.rehanjirayat.portfolio.domain.SocialLink;
import com.rehanjirayat.portfolio.service.ProfileService;
import com.rehanjirayat.portfolio.config.ContactRateLimiter;
import com.rehanjirayat.portfolio.config.ContactRateLimitFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProfileController.class)
@Import({ContactRateLimitFilter.class, ContactRateLimiter.class})
@TestPropertySource(properties = {"rate-limit.max-requests=100", "rate-limit.window-minutes=15"})
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProfileService profileService;

    private Profile createTestProfile() {
        Profile profile = new Profile(
                "Test User", "Backend Developer", "Java", "Test City",
                "test@example.com", "1234567890", "Hello world");
        addLink(profile, "github", "https://github.com/test", "GitHub");
        addLink(profile, "linkedin", "https://linkedin.com/test", "LinkedIn");
        return profile;
    }

    private void addLink(Profile profile, String platform, String href, String label) {
        SocialLink link = new SocialLink(platform, href, label);
        link.setProfile(profile);
        profile.getSocialLinks().add(link);
    }

    @Test
    void getProfile_returnsOkWithProfileData() throws Exception {
        when(profileService.findProfile()).thenReturn(Optional.of(createTestProfile()));

        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.role").value("Backend Developer"))
                .andExpect(jsonPath("$.specialization").value("Java"))
                .andExpect(jsonPath("$.location").value("Test City"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.phone").value("1234567890"))
                .andExpect(jsonPath("$.heroStatement").value("Hello world"));
    }

    @Test
    void getProfile_returnsSocialLinks() throws Exception {
        when(profileService.findProfile()).thenReturn(Optional.of(createTestProfile()));

        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.socialLinks").isArray())
                .andExpect(jsonPath("$.socialLinks.length()").value(2))
                .andExpect(jsonPath("$.socialLinks[0].platform").value("github"))
                .andExpect(jsonPath("$.socialLinks[0].href").value("https://github.com/test"))
                .andExpect(jsonPath("$.socialLinks[1].platform").value("linkedin"));
    }

    @Test
    void getProfile_returnsNotFoundWhenNoProfile() throws Exception {
        when(profileService.findProfile()).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/profile"))
                .andExpect(status().isNotFound());
    }
}
