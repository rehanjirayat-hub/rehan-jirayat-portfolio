package com.rehanjirayat.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

@Component
public class ContactRateLimiter {

    private final int maxRequests;
    private final Duration window;

    private final ConcurrentHashMap<String, Deque<Instant>> requests = new ConcurrentHashMap<>();

    public ContactRateLimiter(
            @Value("${rate-limit.max-requests:5}") int maxRequests,
            @Value("${rate-limit.window-minutes:15}") long windowMinutes) {
        this.maxRequests = maxRequests;
        this.window = Duration.ofMinutes(windowMinutes);
    }

    public boolean allow(String key) {
        Instant now = Instant.now();
        Instant windowStart = now.minus(window);

        Deque<Instant> timestamps = requests.computeIfAbsent(key, k -> new ConcurrentLinkedDeque<>());

        // Evict expired entries
        while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(windowStart)) {
            timestamps.pollFirst();
        }

        if (timestamps.size() >= maxRequests) {
            return false;
        }

        timestamps.addLast(now);
        return true;
    }

    /** Visible for testing — reset all state. */
    void reset() {
        requests.clear();
    }

    public int getMaxRequests() {
        return maxRequests;
    }

    public Duration getWindow() {
        return window;
    }
}
