package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

  Property toEntity(PropertyReq propertyReq);

  PropertyRes toRes(Property property);
}
