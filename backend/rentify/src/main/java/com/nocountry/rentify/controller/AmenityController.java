package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.request.amenity.AmenityReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.service.AmenityServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(("${api.base}/amenities"))
public class AmenityController {

    @Autowired
    private AmenityServiceImpl amenityService;

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
    public ResponseEntity<?> saveAmenity(@Valid @RequestBody AmenityReq amenityReq, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        AmenityRes savedAmenity = amenityService.saveAmenity(amenityReq);
        return ResponseEntity.ok(savedAmenity);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> updateAmenity(@PathVariable Long id, @Valid @RequestBody AmenityReq amenityReq, BindingResult result) {
        AmenityRes updatedAmenity = amenityService.updateAmenity(id, amenityReq);
        return ResponseEntity.ok(updatedAmenity);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAmenity(@PathVariable Long id) {
        amenityService.deleteAmenityById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Amenity with ID " + id + " was successfully deleted.");
    }
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "el campo " + error.getField() + " " + error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
