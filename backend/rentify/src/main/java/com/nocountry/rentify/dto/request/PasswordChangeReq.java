package com.nocountry.rentify.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "Request object for changing a user's password. Contains both the old and new passwords.")
public record PasswordChangeReq(

        @Schema(description = "The user's current password, required to authorize the change.", example = "OldPass123!")
        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\\d)(?=.*[-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?])[A-ZÑa-zñ\\d-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?]{6,}$",
                message = "Old password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        String oldPassword,

        @Schema(description = "The new password to be set. Must follow password strength criteria.", example = "NewPass456!")
        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^(?=.*[A-ZÑ])(?=.*[a-zñ])(?=.*\\d)(?=.*[-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?])[A-ZÑa-zñ\\d-@#$%^&*.,()_+{}|;:'\"<>/!¡¿?]{6,}$",
                message = "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        String newPassword


) {
}
