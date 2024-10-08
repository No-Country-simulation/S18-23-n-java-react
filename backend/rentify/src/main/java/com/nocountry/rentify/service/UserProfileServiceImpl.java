package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.UserProfileMapper;
import com.nocountry.rentify.dto.request.UserProfileReq;
import com.nocountry.rentify.dto.response.UserProfileRes;
import com.nocountry.rentify.exception.UserProfileNotFoundException;
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
    public UserProfileRes getById(Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new UserProfileNotFoundException("User profile not found for id: " + id));
        return userProfileMapper.toResponse(userProfile);
    }

    @Override
    public UserProfile getByUserEmail(String email) {
        return userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new UserProfileNotFoundException("User not found with email: " + email));
    }

    @Override
    @Transactional
    public void create(User user, String name, String last_name) {
        UserProfile userProfile = this.userProfileMapper.toEntity(name,last_name,user);
        userProfileRepository.save(userProfile);
    }

    @Transactional
    @Override
    public UserProfileRes update(UserProfileReq userProfileReq) {
        User user = authenticatedUserService.getAuthenticatedUser();
        UserProfile userProfile = getByUserEmail(user.getEmail());
        userProfileMapper.updateEntity(userProfileReq, userProfile);
        UserProfile updatedProfile = userProfileRepository.save(userProfile);
        return userProfileMapper.toResponse(updatedProfile);
    }

    @Override
    public UserProfileRes getAuthenticatedUserProfile() {
        User user = authenticatedUserService.getAuthenticatedUser();
        UserProfile userProfile = getByUserEmail(user.getEmail());
        return userProfileMapper.toResponse(userProfile);
    }
}
