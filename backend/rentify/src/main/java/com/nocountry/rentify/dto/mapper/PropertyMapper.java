package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.property.PropertyMultimediaReq;
import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyBasicRes;
import com.nocountry.rentify.dto.response.property.PropertyMultimediaRes;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.model.entity.PropertyMultimedia;
import com.nocountry.rentify.service.interfaces.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {UserService.class, PropertyRoomMapper.class})
public interface PropertyMapper {

  @Mappings({
      @Mapping(target = "rooms", ignore = true),
      @Mapping(target = "amenities", ignore = true),
      @Mapping(target = "features", ignore = true),
      @Mapping(target = "owner", source = "ownerId")
  })
  Property toEntity(PropertyReq propertyReq);

  @Mapping(target = "multimedia", source = "propertyMultimedias")
  @Mapping(target = "ownerId", source = "owner.id")
  PropertyRes toRes(Property property);

  PropertyMultimedia toEntity(PropertyMultimediaReq propertyMultimediaReq);

  PropertyMultimediaRes toRes(PropertyMultimedia propertyMultimedia);

  @Mapping(target = "multimedia", source = "propertyMultimedias")
  @Mapping(target = "ownerId", source = "owner.id")
  PropertyBasicRes toBasicRes (Property property);

}
