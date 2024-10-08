package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.ApiResponse;
import com.nocountry.rentify.dto.request.UserProfileReq;
import com.nocountry.rentify.dto.response.UserProfileRes;
import com.nocountry.rentify.service.interfaces.UserProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("${api.base}/user-profile")
@Tag(name="Perfil de usuario")
@RequiredArgsConstructor
@RestController
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Operation(summary = "Get user profile by id", description = "Retrieves the user profile based on the provided ID.")
    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<UserProfileRes>> getUserProfile(@PathVariable Long id) {
        UserProfileRes response = this.userProfileService.getById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>(response));
    }

    @SecurityRequirement(name = "bearer-key")
    @Operation(summary = "Get authenticated user profile", description = "Retrieves the profile of the currently authenticated user.")
    @GetMapping()
    public ResponseEntity<ApiResponse<UserProfileRes>> getAuthenticatedUserProfile() {
        UserProfileRes response = this.userProfileService.getAuthenticatedUserProfile();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>(response));
    }

    @SecurityRequirement(name = "bearer-key")
    @Operation(summary = "Update user profile", description = "Allows the user to update their profile, including the name, lastname, and profile photo. If the 'isRemovePhoto' flag is set to true, the profile photo will be removed. The user's name and lastname must adhere to a strict pattern: they should contain letters and spaces. Any field left blank will retain its current value. Requires authentication." )
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<UserProfileRes>> updateUserProfile(@RequestBody UserProfileReq userProfileReq) {
        UserProfileRes response = this.userProfileService.update(userProfileReq);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>(true,"User profile updated successfully", response));

    }
}
