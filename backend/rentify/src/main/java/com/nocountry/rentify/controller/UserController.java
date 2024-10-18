package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.ApiResponse;
import com.nocountry.rentify.dto.request.PasswordChangeReq;
import com.nocountry.rentify.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("${api.base}/user")
@SecurityRequirement(name = "bearer-key")
@Tag(name="Usuario")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @Operation(summary = "Change password",tags = {"Usuario"}, description = "Change the user's password. This operation requires the user to be authenticated and provide the current password along with the new password.")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordChangeReq request){
        userService.changePassword(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Password changed successfully.",null));
    }

}
