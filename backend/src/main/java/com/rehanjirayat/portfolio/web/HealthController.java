package com.rehanjirayat.portfolio.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    /** Plain-text health check for uptime monitors (e.g. UptimeRobot). */
    @GetMapping("/health")
    public ResponseEntity<String> uptimeHealth() {
        return ResponseEntity.ok("OK");
    }
}