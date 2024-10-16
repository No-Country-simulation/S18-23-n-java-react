package com.nocountry.rentify.controller.amenity;

import com.nocountry.rentify.dto.request.amenity.AmenityReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.service.AmenityServiceImpl;
import com.nocountry.rentify.service.interfaces.AmenityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("${api.base}/amenities"))
@RequiredArgsConstructor
public class AmenityController {
    private final AmenityService amenityService;

    @GetMapping
    public List<AmenityRes> findAll(){
        return amenityService.findAllAmenity();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AmenityRes findById(@PathVariable Long id){
        return amenityService.findAmenityById(id);
    }

    @GetMapping("/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    public AmenityRes  findByName(@PathVariable String name){
        return amenityService.findBynameAmenity(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AmenityRes saveAmenity(@Valid @RequestBody AmenityReq amenityReq) {
        return amenityService.saveAmenity(amenityReq);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public AmenityRes updateAmenity(@PathVariable Long id, @Valid @RequestBody AmenityReq amenityReq) {
        return amenityService.updateAmenity(id, amenityReq);
    }

    @DeleteMapping("/{id}")
    public String deleteAmenity(@PathVariable Long id) {
        amenityService.deleteAmenityById(id);
        return "Amenity with ID " + id + " was successfully deleted.";
    }

}
