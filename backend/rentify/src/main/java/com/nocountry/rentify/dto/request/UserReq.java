package com.nocountry.rentify.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

@Schema(description = "Request payload for user registration")
public record UserReq(

        @Schema(description = "Username", example = "UrbanNest Properties", minLength = 2, maxLength = 50)
        @Size(min = 2, max = 50, message = "Name must be a maximum of 50 characters.")
        String username,

        @Schema(description = "User's first name", example = "John", minLength = 2, maxLength = 50)
        @Size(min = 2, max = 50, message = "Name must be a maximum of 50 characters.")
        @Pattern(regexp = "^[A-Za-zñáéíóúü]+(?: [A-Za-zñáéíóúü]+)*$",
                message = "Name should only contain letters and spaces.")
        String name,

        @Schema(description = "User's last name", example = "Doe", minLength = 2, maxLength = 50)
        @Size(min = 2, max = 50, message = "Last name must be a maximum of 50 characters.")
        @Pattern(regexp = "^[A-Za-zñáéíóúü]+(?: [A-Za-zñáéíóúü]+)*$",
                message = "Name should only contain letters and spaces.")
        String lastname,

        @Schema(description = "User's email address", example = "user@example.com", maxLength = 100)
        @Size(max = 100, message = "Email must be at most 100 characters.")
        @NotBlank(message = "Email is required")
        @Email
        String email,

        @Schema(description = "User's password", example = "P@ssw0rd!", minLength = 8)
        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\\d)(?=.*[-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?])[A-ZÑa-zñ\\d-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?]{6,}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        String password,

        @Schema(description = "The ID of the user's role", example = "1")
        @NotNull(message = "Role ID is required")
        Long roleId
) {
}
