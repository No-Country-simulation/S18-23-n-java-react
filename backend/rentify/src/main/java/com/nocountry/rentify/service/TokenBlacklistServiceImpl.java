package com.nocountry.rentify.service;

import com.nocountry.rentify.exception.InvalidTokenException;
import com.nocountry.rentify.model.entity.TokenBlacklist;
import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.repository.TokenBlacklistRepository;
import com.nocountry.rentify.security.jwt.JwtTokenProvider;
import com.nocountry.rentify.service.interfaces.TokenBlacklistService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class TokenBlacklistServiceImpl implements TokenBlacklistService {

    @Lazy
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    private final TokenBlacklistRepository tokenBlacklistRepository;

    @Transactional
    @Override
    public void addToBlacklist(String token, User user) {
        if (!jwtTokenProvider.isTokenValid(token, user)){
            throw new InvalidTokenException("Token is not valid");
        }
        TokenBlacklist tokenBlacklist = new TokenBlacklist();
        tokenBlacklist.setToken(token);
        tokenBlacklist.setExpirationDate(jwtTokenProvider.getTokenExpirationDate(token));
        tokenBlacklistRepository.save(tokenBlacklist);
    }

    @Transactional
    public boolean isTokenInBlacklist(String token) {
        return tokenBlacklistRepository.existsByToken(token);
    }


    @Transactional
    @Scheduled(cron = "0 */14 * * * ?") // Cada 14 minutos
    public void cleanupExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        tokenBlacklistRepository.deleteExpiredTokens(now);
    }




}
