package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.PropertyMultimedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyMultimediaRepository extends JpaRepository<PropertyMultimedia, Long> {
}
