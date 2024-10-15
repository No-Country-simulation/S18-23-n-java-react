package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.rooms.RoomDtoRes;

import com.nocountry.rentify.model.entity.Room;
import java.util.List;

public interface RoomService {
    List<RoomDtoRes> getAllRooms();
    RoomDtoRes getRoomById(Integer id);
    Room getById(Integer id);
}
