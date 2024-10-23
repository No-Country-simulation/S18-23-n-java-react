package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.UserProfileMapper;
import com.nocountry.rentify.dto.request.UserProfileReq;
import com.nocountry.rentify.dto.request.UserReq;
import com.nocountry.rentify.dto.response.UserProfileRes;
import com.nocountry.rentify.exception.NameLastNameRequiredForUserException;
import com.nocountry.rentify.exception.UserProfileNotFoundException;
import com.nocountry.rentify.exception.UsernameRequiredForRealtor;
import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.model.entity.UserProfile;
import com.nocountry.rentify.repository.UserProfileRepository;
import com.nocountry.rentify.service.interfaces.AuthenticatedUserService;
import com.nocountry.rentify.service.interfaces.UserProfileService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final AuthenticatedUserService authenticatedUserService;
    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;

    @Override
    @Transactional
    public UserProfileRes getById(Long id) {
        return userProfileRepository.findById(id)
                .map(userProfileMapper::toResponse)
                .orElseThrow(() -> new UserProfileNotFoundException("User profile not found for id: " + id));
    }

    @Override
    @Transactional
    public UserProfileRes getAuthenticatedUserProfile() {
        User user = authenticatedUserService.getAuthenticatedUser();
        UserProfile userProfile = getByUserEmail(user.getEmail());
        return userProfileMapper.toResponse(userProfile);
    }

    @Override
    @Transactional
    public UserProfile getByUserEmail(String email) {
        return userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new UserProfileNotFoundException("User not found with email: " + email));
    }

    @Override
    @Transactional
    public void create(User user, UserReq userReq) {
        UserProfile userProfile = createUserProfile(user, userReq);
        userProfileRepository.save(userProfile);
    }

    private UserProfile createUserProfile(User user, UserReq userReq) {
        String roleName = user.getRole().getName();
        if ("USER".equals(roleName)) {
            validateUserFields(userReq.name(), userReq.lastname());
            return userProfileMapper.toEntity(null, userReq.name(), userReq.lastname(), user);
        } else if ("INMOBILIARIA".equals(roleName)) {
            validateRealtorFields(userReq.username());
            return userProfileMapper.toEntity(userReq.username(), null, null, user);
        }
        throw new IllegalArgumentException("Invalid user role");
    }

    @Transactional
    @Override
    public UserProfileRes update(UserProfileReq userProfileReq) {
        User user = authenticatedUserService.getAuthenticatedUser();
        UserProfile userProfile = getByUserEmail(user.getEmail());
        userProfileMapper.updateEntity(userProfileReq, userProfile);

        String roleName = user.getRole().getName();
        if ("USER".equals(roleName)) {
            userProfile.setUsername(null);
        } else if ("INMOBILIARIA".equals(roleName)) {
            userProfile.setName(null);
            userProfile.setLastName(null);
        }

        UserProfile updatedProfile = userProfileRepository.save(userProfile);
        return userProfileMapper.toResponse(updatedProfile);
    }

    private void validateUserFields(String name, String lastname) {
        if (isBlank(name) || isBlank(lastname)) {
            throw new NameLastNameRequiredForUserException("Name and last name are required for USER role");
        }
    }

    private void validateRealtorFields(String username) {
        if (isBlank(username)) {
            throw new UsernameRequiredForRealtor("Username is required for INMOBILIARIA role");
        }
    }

    private boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }
}