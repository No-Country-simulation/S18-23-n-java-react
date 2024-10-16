package com.nocountry.rentify.dto.mapper;


import com.nocountry.rentify.dto.response.feature.FeatureRes;
import com.nocountry.rentify.model.entity.Feature;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FeatureMapper {
    FeatureRes toResp(Feature feature);
}
