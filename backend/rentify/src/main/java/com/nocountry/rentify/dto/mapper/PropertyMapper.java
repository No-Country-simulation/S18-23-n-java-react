package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.service.interfaces.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {UserService.class, PropertyRoomMapper.class})
public interface PropertyMapper {

  @Mapping(target = "owner", source = "ownerId")
  @Mappings({@Mapping(target = "rooms", ignore = true),@Mapping(target = "id", ignore = true)})
  Property toEntity(PropertyReq propertyReq);

  PropertyRes toRes(Property property);
}
