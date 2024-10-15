package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.feature.FeatureRes;

import java.util.List;

public interface FeatureService {
    /**
     *
     * @return all the features listed in the database
     */
    List<FeatureRes> getAllFeatures();


    /**
     * Get a specific feature
     *
     * @param id the id of the feature being searched for
     * @return an object feature
     */
    FeatureRes getFeatureById(Long id);
}