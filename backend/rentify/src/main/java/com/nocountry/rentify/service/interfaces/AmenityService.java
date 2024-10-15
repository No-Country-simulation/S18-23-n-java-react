package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.amenity.AmenityRes;

import java.util.List;

public interface AmenityService {
    List<AmenityRes> findAllAmenity();
    AmenityRes findAmenityById(Long id);
}
