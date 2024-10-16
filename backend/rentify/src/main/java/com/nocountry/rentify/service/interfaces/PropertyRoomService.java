package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.rooms.PropertyRoomRes;
import java.util.List;

public interface PropertyRoomService {
    List<PropertyRoomRes> findRoomsByPropertyId(Long propertyId);
}
