package com.nocountry.rentify.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request object for email verification. Contains the token that verifies the user's email.")
public record EmailVerificationReq(

        @Schema(description = "The token sent to the user's email for verification.", example = "d4e6f7g8h9i0")
        @NotBlank(message = "Token is required")
        String token
) {
}
