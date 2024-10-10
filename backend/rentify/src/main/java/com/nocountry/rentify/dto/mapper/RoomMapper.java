package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.response.rooms.RoomDtoRes;
import com.nocountry.rentify.model.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoomMapper {

    RoomMapper mapper = Mappers.getMapper(RoomMapper.class);

    RoomDtoRes toDtoRes(Room room);
    Room toEntity(RoomDtoRes roomDtoRes);
}
