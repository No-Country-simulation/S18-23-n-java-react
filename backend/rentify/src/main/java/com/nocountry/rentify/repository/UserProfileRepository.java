package com.nocountry.rentify.repository;


import com.nocountry.rentify.model.entity.UserProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query("SELECT up FROM UserProfile up JOIN up.user u WHERE u.email = :email")
    Optional<UserProfile> findByUserEmail(String email);
}
