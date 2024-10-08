package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.model.entity.User;

public interface TokenBlacklistService {

    void addToBlacklist(String token, User username);

    boolean isTokenInBlacklist(String token);
}
