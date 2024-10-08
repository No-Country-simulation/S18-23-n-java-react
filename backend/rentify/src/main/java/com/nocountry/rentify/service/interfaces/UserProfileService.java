package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.request.UserProfileReq;
import com.nocountry.rentify.dto.response.UserProfileRes;
import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.model.entity.UserProfile;

public interface UserProfileService {

    /**
     * Retrieves a user profile by its ID.
     *
     * @param id the ID of the user profile to retrieve
     * @return the {@link UserProfileRes} containing the user profile details
     */
    UserProfileRes getById(Long id);

    /**
     * Retrieves a user profile by the user's email.
     *
     * @param email the email of the user whose profile is being retrieved
     * @return the {@link UserProfile} entity associated with the specified user email
     */
    UserProfile getByUserEmail(String email);

    /**
     * Creates a new user profile for a given user.
     *
     * @param user the user entity for whom the profile is being created
     * @param name the first name of the user
     * @param lastName the last name of the user
     */
    void create(User user, String name, String lastName);

    /**
     * Updates an existing user profile with new information.
     *
     * @param userProfileReq the {@link UserProfileReq} containing the updated profile information
     * @return the updated {@link UserProfileRes} with the new profile details
     */
    UserProfileRes update(UserProfileReq userProfileReq);

    /**
     * Retrieves the profile information of the currently authenticated user.
     *
     * @return {@link UserProfileRes} containing the authenticated user's profile details.
     */
    UserProfileRes getAuthenticatedUserProfile();
}
