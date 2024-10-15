package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.rooms.RoomRes;

import com.nocountry.rentify.model.entity.Room;
import java.util.List;

public interface RoomService {
    List<RoomRes> getAllRooms();
    RoomRes getRoomById(Integer id);
}
