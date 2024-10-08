package com.nocountry.rentify.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object containing user information.")
public record UserRes(

        @Schema(description = "The unique identifier of the user.", example = "1")
        int id,

        @Schema(description = "The email address of the user.", example = "user@example.com")
        String email
) {
}
