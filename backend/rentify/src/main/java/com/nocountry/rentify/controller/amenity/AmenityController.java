package com.nocountry.rentify.controller.amenity;

import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.service.interfaces.AmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.base}/amenities")
@RequiredArgsConstructor
public class AmenityController {
    private final AmenityService amenityService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AmenityRes> findAll(){
        return amenityService.findAllAmenity();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AmenityRes findById(@PathVariable Long id){
        return amenityService.findAmenityById(id);
    }
}
