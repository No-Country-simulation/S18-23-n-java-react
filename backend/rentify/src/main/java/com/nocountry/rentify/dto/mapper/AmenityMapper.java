package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.amenity.AmenityReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.model.entity.Amenity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AmenityMapper {

    Amenity toEntity(AmenityReq amenityReq);

    AmenityRes toRes(Amenity amenity);
  //  List<PropertyRes> toPropertyResList(List<Property> properties);


}
