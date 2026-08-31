package com.rehanjirayat.portfolio.dto;

import com.rehanjirayat.portfolio.domain.Certification;

public record CertificationResponse(
        String id,
        String name,
        String organization,
        String date,
        String credentialUrl
) {
    public static CertificationResponse fromCertification(Certification cert) {
        return new CertificationResponse(
                cert.getId(),
                cert.getName(),
                cert.getOrganization(),
                cert.getDate(),
                cert.getCredentialUrl()
        );
    }
}
