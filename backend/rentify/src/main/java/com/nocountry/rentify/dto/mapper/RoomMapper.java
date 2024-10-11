package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.response.rooms.RoomDtoRes;
import com.nocountry.rentify.model.entity.Room;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomDtoRes toDtoRes(Room room);
    Room toEntity(RoomDtoRes roomDtoRes);
}
