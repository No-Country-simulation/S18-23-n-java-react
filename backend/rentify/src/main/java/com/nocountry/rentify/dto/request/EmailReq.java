package com.nocountry.rentify.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for email-based actions like password reset or email verification")
public record EmailReq(

        @Schema(description = "User's email address", example = "user@example.com", maxLength = 100)
        @Size(max = 100, message = "Email must be at most 100 characters.")
        @NotBlank(message = "Email is required")
        @Email
        String email

) {
}
