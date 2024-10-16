package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.response.FeatureRes;
import com.nocountry.rentify.model.entity.Feature;

public class FeatureMapper {
    
    public static FeatureRes toDTO(Feature feature){
        FeatureRes dto = new FeatureRes();
        dto.setId(feature.getId_feature());
        dto.setName(feature.getName());
        return dto;
    }
    
    public static Feature toEntity(FeatureRes dto){
        Feature feature = new Feature();
        feature.setId_feature(dto.getId());
        feature.setName(dto.getName());
        return feature;
    }
}
