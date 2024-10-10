package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.request.PasswordChangeReq;
import com.nocountry.rentify.dto.request.UserReq;
import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.model.entity.User;

public interface UserService {

  /**
   * Creates a new user in the system based on the provided user request.
   *
   * @param user: the {@link UserReq} object containing user registration details
   * @return the {@link UserRes} object representing the created user
   */
  UserRes create (UserReq user);

  /**
   * Retrieves a user by their email address.
   *
   * @param email the email address of the user to be retrieved
   * @return the {@link User} entity associated with the provided email
   */
  User getByEmail(String email);

  /**
   * Changes the password for an authenticated user based on the provided password change request.
   *
   * @param request the {@link PasswordChangeReq} object containing the new password and necessary verification details
   */
  void changePassword(PasswordChangeReq request);

  User findById(Long id);
}
