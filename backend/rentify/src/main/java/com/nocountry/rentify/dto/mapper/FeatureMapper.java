package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.FeatureDTO;
import com.nocountry.rentify.model.entity.Feature;

public class FeatureMapper {
    
    public static FeatureDTO toDTO(Feature feature){
        FeatureDTO dto = new FeatureDTO();
        dto.setId(feature.getId_feature());
        dto.setName(feature.getName());
        return dto;
    }
    
    public static Feature toEntity(FeatureDTO dto){
        Feature feature = new Feature();
        feature.setId_feature(dto.getId());
        feature.setName(dto.getName());
        return feature;
    }
}
