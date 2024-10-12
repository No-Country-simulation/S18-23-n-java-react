package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {

}
