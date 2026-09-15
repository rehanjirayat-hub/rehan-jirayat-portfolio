package com.rehanjirayat.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminProfileUpdateRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Size(max = 100) String role,
        @NotBlank @Size(max = 200) String specialization,
        @NotBlank @Size(max = 100) String location,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(max = 20) String phone,
        @NotBlank String heroStatement
) {
}