package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.response.rooms.RoomRes;
import com.nocountry.rentify.model.entity.Room;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomRes toDtoRes(Room room);
    Room toEntity(RoomRes roomRes);
}
