package com.rehanjirayat.portfolio.web;

import com.rehanjirayat.portfolio.dto.AdminLoginRequest;
import com.rehanjirayat.portfolio.dto.AdminLoginResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;
    private final long ttlMinutes;

    public AdminAuthController(AuthenticationManager authenticationManager,
                               JwtEncoder jwtEncoder,
                               @Value("${admin.jwt-ttl-minutes:60}") long ttlMinutes) {
        this.authenticationManager = authenticationManager;
        this.jwtEncoder = jwtEncoder;
        this.ttlMinutes = ttlMinutes;
    }

    @PostMapping("/login")
    public AdminLoginResponse login(@Valid @RequestBody AdminLoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password()));
            Instant issuedAt = Instant.now();
            Instant expiresAt = issuedAt.plusSeconds(ttlMinutes * 60);
            JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("portfolio-api")
                    .subject(authentication.getName())
                    .issuedAt(issuedAt)
                    .expiresAt(expiresAt)
                    .claim("role", "ADMIN")
                    .build();
            String token = jwtEncoder.encode(
                    JwtEncoderParameters.from(
                            JwsHeader.with(MacAlgorithm.HS256).build(),
                            claims)).getTokenValue();
            return new AdminLoginResponse(token, expiresAt.getEpochSecond() - issuedAt.getEpochSecond());
        } catch (BadCredentialsException | IllegalStateException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin credentials");
        }
    }
}