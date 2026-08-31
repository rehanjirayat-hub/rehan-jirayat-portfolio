package com.rehanjirayat.portfolio.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContactRateLimiterTest {

    private ContactRateLimiter rateLimiter;

    @BeforeEach
    void setUp() {
        rateLimiter = new ContactRateLimiter(3, 15);
        rateLimiter.reset();
    }

    @Test
    void allowsRequestsWithinLimit() {
        assertTrue(rateLimiter.allow("192.168.1.1"));
        assertTrue(rateLimiter.allow("192.168.1.1"));
        assertTrue(rateLimiter.allow("192.168.1.1"));
    }

    @Test
    void rejectsRequestWhenLimitExceeded() {
        assertTrue(rateLimiter.allow("10.0.0.1"));
        assertTrue(rateLimiter.allow("10.0.0.1"));
        assertTrue(rateLimiter.allow("10.0.0.1"));
        assertFalse(rateLimiter.allow("10.0.0.1"));
    }

    @Test
    void differentIpsAreTrackedIndependently() {
        assertTrue(rateLimiter.allow("192.168.1.1"));
        assertTrue(rateLimiter.allow("192.168.1.1"));
        assertTrue(rateLimiter.allow("192.168.1.1"));
        assertFalse(rateLimiter.allow("192.168.1.1"));

        // Different IP should have its own quota
        assertTrue(rateLimiter.allow("10.0.0.2"));
        assertTrue(rateLimiter.allow("10.0.0.2"));
        assertTrue(rateLimiter.allow("10.0.0.2"));
        assertFalse(rateLimiter.allow("10.0.0.2"));
    }

    @Test
    void windowExpiryAllowsNewRequests() throws InterruptedException {
        // Use a 1-second window for fast testing
        ContactRateLimiter shortWindow = new ContactRateLimiter(2, 0);
        shortWindow.reset();

        assertTrue(shortWindow.allow("10.0.0.1"));
        assertTrue(shortWindow.allow("10.0.0.1"));
        assertFalse(shortWindow.allow("10.0.0.1"));

        // Wait for window to expire
        Thread.sleep(1100);

        assertTrue(shortWindow.allow("10.0.0.1"));
    }

    @Test
    void resetClearsAllState() {
        assertTrue(rateLimiter.allow("10.0.0.1"));
        assertTrue(rateLimiter.allow("10.0.0.1"));
        assertTrue(rateLimiter.allow("10.0.0.1"));
        assertFalse(rateLimiter.allow("10.0.0.1"));

        rateLimiter.reset();

        assertTrue(rateLimiter.allow("10.0.0.1"));
    }

    @Test
    void reportsConfiguredLimits() {
        assertEquals(3, rateLimiter.getMaxRequests());
        assertEquals(15, rateLimiter.getWindow().toMinutes());
    }
}
