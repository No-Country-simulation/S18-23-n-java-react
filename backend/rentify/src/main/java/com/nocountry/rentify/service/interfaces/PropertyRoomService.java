package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.rooms.PropertyRoomDtoRes;

import com.nocountry.rentify.model.entity.PropertyRoom;
import java.util.List;

public interface PropertyRoomService {
    List<PropertyRoomDtoRes> findRoomsByPropertyId(Long propertyId);
}
