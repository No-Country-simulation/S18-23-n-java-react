package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.TokenBlacklist;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TokenBlacklistRepository extends JpaRepository <TokenBlacklist, Long> {

    boolean existsByToken(String token);

    @Modifying
    @Transactional
    @Query("DELETE FROM TokenBlacklist t WHERE t.expirationDate < :now")
    void deleteExpiredTokens(LocalDateTime now);
}
