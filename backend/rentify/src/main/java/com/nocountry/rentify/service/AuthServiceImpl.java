package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.UserMapper;
import com.nocountry.rentify.dto.request.*;
import com.nocountry.rentify.dto.response.LoginRes;
import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.exception.InvalidAuthorizationHeaderException;
import com.nocountry.rentify.exception.InvalidTokenPurposeException;
import com.nocountry.rentify.exception.TokenExpiredException;
import com.nocountry.rentify.exception.UserNotVerifiedException;
import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.model.enums.TokenPurpose;
import com.nocountry.rentify.repository.UserRepository;
import com.nocountry.rentify.security.jwt.JwtTokenProvider;
import com.nocountry.rentify.service.interfaces.AuthService;
import com.nocountry.rentify.service.interfaces.EmailService;
import com.nocountry.rentify.service.interfaces.TokenBlacklistService;
import com.nocountry.rentify.service.interfaces.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;
  private final EmailService emailService;
  private final TokenBlacklistService tokenBlacklistService;
  private final AuthenticatedUserServiceImpl authenticatedUserService;
  private final UserMapper userMapper;

  @Value("${frontend.baseUrl}")
  private String baseUrl;

  @Value("${frontend.verifyEmailUrl}")
  private String resetPasswordUrl;

  @Override
  public LoginRes login(LoginReq loginReq) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginReq.email(), loginReq.password()));
    User user = userService.getByEmail(loginReq.email());

    if(!user.isVerify()) {
      throw new UserNotVerifiedException("User is not verified");
    }
    String token = this.jwtTokenProvider.generateSessionToken(user);
    return userMapper.toLoginRes(user, token);
  }

  @Override
  public UserRes register(UserReq userReq) {
    return this.userService.create(userReq);
  }

  @Transactional
  @Override
  public void forgotPassword(EmailReq request) {
    User user = this.userService.getByEmail(request.email());
    String token = jwtTokenProvider.generateTokenForPurpose(user, TokenPurpose.RESET_PASSWORD);

    Map<String, Object> templateModel = new HashMap<>();
    templateModel.put("name", user.getProfile().getName());
    templateModel.put("recoveryPasswordUrl",baseUrl+resetPasswordUrl+"?token="+token);

    emailService.sendEmail(request.email(),
            "We Received a Password Reset Request for Your Account",
            templateModel,
            "password-recovery");
  }

  @Transactional
  @Override
  public void resetPassword(PasswordResetReq request) {
    validateToken(request.token(), TokenPurpose.RESET_PASSWORD);
    String email = jwtTokenProvider.getUsernameFromToken(request.token());
    User user = userService.getByEmail(email);
    user.setPassword(passwordEncoder.encode(request.password()));
    userRepository.save(user);
    tokenBlacklistService.addToBlacklist(request.token(),user);
  }

  @Transactional
  @Override
  public void verifyEmail(EmailVerificationReq request) {
    validateToken(request.token(), TokenPurpose.VERIFY_EMAIL);
    String email = jwtTokenProvider.getUsernameFromToken(request.token());
    User user = userService.getByEmail(email);
    user.setVerify(true);
    userRepository.save(user);
    tokenBlacklistService.addToBlacklist(request.token(),user);
  }


  private void validateToken(String token, TokenPurpose expectedPurpose) {
    if (jwtTokenProvider.isTokenExpired(token)) {
      throw new TokenExpiredException("Token has expired");
    }
    String purposeToken = jwtTokenProvider.getPurposeFromToken(token);
    if (!expectedPurpose.name().equals(purposeToken)) {
      throw new InvalidTokenPurposeException("This token cannot be used for this purpose.");
    }
  }

  @Transactional
  @Override
  public void resendVerificationEmail(EmailReq request) {emailService.sendVerificationEmail(request);}

  @Transactional
  @Override
  public void logout(HttpServletRequest request) {
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);
      User user = authenticatedUserService.getAuthenticatedUser();
      tokenBlacklistService.addToBlacklist(token, user);
    }
    else
      throw new InvalidAuthorizationHeaderException("Authorization header is invalid");
  }
}
