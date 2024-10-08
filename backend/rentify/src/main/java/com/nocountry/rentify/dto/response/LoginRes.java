package com.nocountry.rentify.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object for a successful login operation, including user ID, role, and authentication token.")
public record LoginRes(

        @Schema(description = "The unique identifier of the user.", example = "123")
        Long id,

        @Schema(description = "The role assigned to the user, e.g., 'USER' or 'ADMIN'.", example = "USER")
        String role,

        @Schema(description = "The authentication token to be used for authorized requests.", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
        String token
) {
}
