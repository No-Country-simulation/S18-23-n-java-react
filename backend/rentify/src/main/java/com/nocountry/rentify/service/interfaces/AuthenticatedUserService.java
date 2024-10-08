package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.model.entity.User;

public interface AuthenticatedUserService {

    /**
     * Retrieves the currently authenticated user from the security context.
     *
     * @return the {@link User} entity of the authenticated user
     */
    User getAuthenticatedUser();

}
