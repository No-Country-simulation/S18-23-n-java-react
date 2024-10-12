package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.FeatureDTO;
import java.util.List;

public interface FeatureService {
    /**
     * 
     * @return all the features listed in the database 
     */
    List<FeatureDTO> getAllFeatures();
    
    
    /**
     * Create a new feature
     * 
     * @param featureDTO is the object that is instantiated
     */
    FeatureDTO createFeature(FeatureDTO featureDTO);
    
    /**
     * Edit an existing feature
     * 
     * @param feature the object instantiated that is going to be edited
     */
    void editFeature(FeatureDTO feature);
    
    /**
     * Deletes a feature
     * 
     * @param id_feature the id of the row placed in the database that is going to be deleted
     */
    void deleteFeature(Long id_feature);
    
    /**
     * Get a specific feature
     * 
     * @param id_feature the id of the feature being searched for
     * @return an object feature
     */
    FeatureDTO getFeature(Long id_feature);
    
}
