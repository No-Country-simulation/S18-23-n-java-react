package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.response.rooms.PropertyRoomDtoRes;
import com.nocountry.rentify.model.entity.PropertyRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PropertyRoomMapper {
    PropertyRoomMapper mapper = Mappers.getMapper(PropertyRoomMapper.class);

    @Mapping(source = "room.name", target = "roomName")
    PropertyRoomDtoRes toDtoRes(PropertyRoom propertyRoom);

    @Mapping(source = "roomName", target = "room.name")
    PropertyRoom toEntity(PropertyRoomDtoRes propertyRoomDtoRes);
}
