package com.nocountry.rentify.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Response object containing user profile information.")
public record UserProfileRes(

        @Schema(description = "The first name of the user.", example = "UrbanNest Properties")
        String username,

        @Schema(description = "The username.", example = "")
        String name,

        @Schema(description = "The last name of the user.", example = "Doe")
        String lastname,

        @Schema(description = "The email address of the user.", example = "user@example.com")
        String email,

        @Schema(description = "The phone number of the user.", example = "+54 9 11 1234 5678")
        String phone,

        @Schema(description = "The URL of the user's profile photo.", example = "https://example.com/photos/john_doe.jpg")
        String photo

) {
}
