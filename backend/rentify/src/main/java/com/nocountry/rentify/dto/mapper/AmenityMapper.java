package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.amenity.AmenityReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Amenity;
import com.nocountry.rentify.model.entity.Property;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AmenityMapper {

    Amenity toEntity(AmenityReq amenityReq);

    AmenityRes toResp(Amenity amenity);
  //  List<PropertyRes> toPropertyResList(List<Property> properties);
}
