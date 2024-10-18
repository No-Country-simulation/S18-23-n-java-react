package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.UserMapper;
import com.nocountry.rentify.dto.request.EmailReq;
import com.nocountry.rentify.dto.request.PasswordChangeReq;
import com.nocountry.rentify.dto.request.UserReq;
import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.exception.IncorrectCurrentPasswordException;
import com.nocountry.rentify.exception.UserNotFoundException;
import com.nocountry.rentify.model.entity.Role;
import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.repository.UserRepository;
import com.nocountry.rentify.service.interfaces.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@RequiredArgsConstructor
@Validated
public class UserServiceImpl implements UserService {

  private final UserMapper userMapper;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final RoleService roleService;
  private final UserProfileService userProfileService;
  private final EmailService emailService;
  private final AuthenticatedUserService authenticatedUserService;


  @Override
  @Transactional
  public UserRes create(UserReq userReq) {
    User user = createUserFromRequest(userReq);
    User savedUser = userRepository.save(user);
    userProfileService.create(savedUser, userReq);
    emailService.sendVerificationEmail(new EmailReq(user.getEmail()));
    return userMapper.toResponse(savedUser);
  }

  private User createUserFromRequest(UserReq userReq) {
    User user = userMapper.toEntity(userReq);
    user.setPassword(passwordEncoder.encode(userReq.password()));
    Role role = roleService.findRoleByIdExludeAdmin(userReq.roleId());
    user.setRole(role);
    return user;
  }

  @Override
  public User getByEmail(String email) {
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
  }

  @Transactional
  @Override
  public void changePassword(PasswordChangeReq request) {
    User user = authenticatedUserService.getAuthenticatedUser();
    if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
      throw new IncorrectCurrentPasswordException("Current password is incorrect");
    }
    user.setPassword(passwordEncoder.encode(request.newPassword()));
    userRepository.save(user);
  }

}