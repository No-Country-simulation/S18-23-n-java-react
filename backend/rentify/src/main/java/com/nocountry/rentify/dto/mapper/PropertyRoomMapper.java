package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.response.rooms.PropertyRoomRes;
import com.nocountry.rentify.model.entity.PropertyRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PropertyRoomMapper {

    @Mapping(source = "room.name", target = "roomName")
    PropertyRoomRes toDtoRes(PropertyRoom propertyRoom);

    @Mapping(source = "roomName", target = "room.name")
    PropertyRoom toEntity(PropertyRoomRes propertyRoomRes);
}
