package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.ApiResponse;
import com.nocountry.rentify.dto.request.*;
import com.nocountry.rentify.dto.response.LoginRes;
import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("${api.base}/auth")
@Tag(name="Authentication")
@RequiredArgsConstructor
@RestController
public class AuthController {

  private final AuthService authService;

  @Operation(summary = "Authenticate user", description = "Log in a user by verifying their credentials (email and password). Returns a token for authenticated requests.")
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginReq request){
      LoginRes response = this.authService.login(request);
      return ResponseEntity.ok(new ApiResponse<>(response));
  }

  @Operation(summary = "Register user", description = "Register a new user account. The user will receive a verification email to confirm their email address.")
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid UserReq request){
    UserRes response = this.authService.register(request);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(true,"User created successfully. Please check your email to verify your account.", response));
  }

  @Operation(summary = "Verify email", description = "Verify the user's email address using the verification token sent by email. Activates the user's account.")
  @PostMapping("/verify-email")
  public ResponseEntity<?> verify(@RequestBody @Valid EmailVerificationReq request ){
    authService.verifyEmail(request);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(true,"Email verified successfully. Your account is now active.", null));
  }

  @Operation(summary = "Resend verification email", description = "Resend the email verification link to the user's email address.")
  @PostMapping("/resend-verification-email")
  public ResponseEntity<ApiResponse<String>> resendVerificationEmail(@RequestBody @Valid EmailReq request) {
    authService.resendVerificationEmail(request);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ApiResponse<>(true,"Verification email resent. Please check your inbox to verify your account.", null));
  }

  @Operation(summary = "Recover password", description = "Send an email with instructions to reset the user's password. A token will be included to verify the request.")
  @PostMapping("/recovery-password")
  public ResponseEntity<?> recoveryPassword(@RequestBody @Valid EmailReq request){
    authService.forgotPassword(request);
    return ResponseEntity.ok(new ApiResponse<>(true, "Password reset email sent. Please check your inbox to reset your password.",null));
  }

  @Operation(summary = "Reset password", description = "Reset the user's password using the token provided in the password reset email.")
  @PostMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@RequestBody @Valid PasswordResetReq request){
    authService.resetPassword(request);
    return ResponseEntity.ok(new ApiResponse<>(true, "Password reset successfully. You can now log in with your new password.", null));
  }

  @SecurityRequirement(name = "bearer-key")
  @Operation(summary = "Log out a user", description = "Logs out the authenticated user by invalidating the current session token. The token is added to the blacklist to prevent future use.")
  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request){
    this.authService.logout(request);
    return ResponseEntity.ok(new ApiResponse<>(true,"User logged out successfully.",null));
  }


}
