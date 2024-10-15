package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.rooms.RoomRes;

import java.util.List;

public interface RoomService {
    List<RoomRes> getAllRooms();
    RoomRes getRoomById(Integer id);
}
