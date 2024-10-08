package com.nocountry.rentify.service;

import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.service.interfaces.AuthenticatedUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedUserServiceImpl implements AuthenticatedUserService {
    @Override
    public User getAuthenticatedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
