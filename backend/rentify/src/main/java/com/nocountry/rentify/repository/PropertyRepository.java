package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
//    Optional<Property> findByOwnerId(User ownerId);
}
