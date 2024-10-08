package com.nocountry.rentify.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for user login")
public record LoginReq(

        @Schema(description = "User's email address", example = "user@example.com", maxLength = 100)
        @Size(max = 100, message = "Email must be at most 100 characters.")
        @NotBlank(message = "Email is required")
        @Email
        String email,

        @Schema(description = "User's password", example = "P@ssw0rd!", minLength = 8)
        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\\d)(?=.*[-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?])[A-ZÑa-zñ\\d-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?]{6,}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password
) {
}
