package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.room.PropertyRoomReq;
import com.nocountry.rentify.dto.response.rooms.PropertyRoomDtoRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.service.interfaces.PropertyRoomService;
import com.nocountry.rentify.service.interfaces.RoomService;
import org.mapstruct.AfterMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {PropertyMapper.class, RoomService.class})
public interface PropertyRoomMapper {

    @Mapping(source = "room.name", target = "roomName")
    PropertyRoomDtoRes toDtoRes(PropertyRoom propertyRoom);

    @Mapping(source = "id", target = "room")
    PropertyRoom toEntity(PropertyRoomReq propertyRoomReq, @Context Property property);
    @AfterMapping
    default void afterMapping(PropertyRoomReq request, @MappingTarget PropertyRoom propertyRoom, @Context Property property) {
        propertyRoom.setProperty(property);
    }
}
