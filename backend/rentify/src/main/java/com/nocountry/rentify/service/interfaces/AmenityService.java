package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.model.entity.Amenity;
import java.util.List;

public interface AmenityService {
    List<AmenityRes> findAllAmenity();
    AmenityRes findAmenityById(Long id);

    Amenity findById(Long id);
}
