package com.rehanjirayat.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ContactRateLimitFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(ContactRateLimitFilter.class);

    private static final String CONTACT_PATH = "/api/contact";
    private static final String POST_METHOD = "POST";

    private final ContactRateLimiter rateLimiter;
    private final boolean trustProxyHeaders;

    public ContactRateLimitFilter(
            ContactRateLimiter rateLimiter,
            @Value("${rate-limit.trust-proxy-headers:false}") boolean trustProxyHeaders) {
        this.rateLimiter = rateLimiter;
        this.trustProxyHeaders = trustProxyHeaders;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (POST_METHOD.equals(request.getMethod()) && CONTACT_PATH.equals(request.getRequestURI())) {
            String clientIp = resolveClientIp(request);

            if (!rateLimiter.allow(clientIp)) {
                log.warn("Rate limit exceeded for IP: {}", clientIp);

                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);

                ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                        HttpStatus.TOO_MANY_REQUESTS,
                        "Too many contact form submissions. Please try again later.");
                problem.setTitle("Rate Limit Exceeded");
                problem.setType(URI.create("about:blank"));

                response.getWriter().write(
                        new com.fasterxml.jackson.databind.ObjectMapper()
                                .writeValueAsString(problem));
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String resolveClientIp(HttpServletRequest request) {
        if (trustProxyHeaders) {
            String xff = request.getHeader("X-Forwarded-For");
            if (xff != null && !xff.isBlank()) {
                // First IP in the chain is the original client
                return xff.split(",")[0].trim();
            }
            String realIp = request.getHeader("X-Real-IP");
            if (realIp != null && !realIp.isBlank()) {
                return realIp.trim();
            }
        }
        return request.getRemoteAddr();
    }
}
