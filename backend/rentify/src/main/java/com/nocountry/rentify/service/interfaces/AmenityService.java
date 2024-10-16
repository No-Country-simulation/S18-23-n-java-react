package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.request.amenity.AmenityReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.model.entity.Amenity;

import java.util.List;
import java.util.Optional;

public interface AmenityService {
    List<AmenityRes> findAllAmenity();
    AmenityRes findAmenityById(Long id);
    AmenityRes findBynameAmenity(String name);
    AmenityRes saveAmenity(AmenityReq amenity);
    AmenityRes updateAmenity(Long id, AmenityReq anemity);
    void deleteAmenityById(Long id);
    Amenity findById(Long id);
}
