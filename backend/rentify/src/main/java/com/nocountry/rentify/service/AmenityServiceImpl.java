package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.AmenityMapper;
import com.nocountry.rentify.dto.request.amenity.AmenityReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.model.entity.Amenity;
import com.nocountry.rentify.repository.AmenityRepository;
import com.nocountry.rentify.service.interfaces.AmenityService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AmenityServiceImpl implements AmenityService {
    private final AmenityRepository amenityRepository;
    private final AmenityMapper mapper;

    @Override
    public List<AmenityRes> findAllAmenity() {
        List<Amenity> amenities = amenityRepository.findAll();
        if (amenities.isEmpty()) {
            throw new EntityNotFoundException("No amenities found");
        }
        return amenities.stream()
                .map(mapper::toRes)
                .collect(Collectors.toList());
    }

    @Override
    public AmenityRes findAmenityById(Long id) {
        return amenityRepository.findById(id)
                .map(mapper::toRes)
                .orElseThrow(() -> new EntityNotFoundException("Amenity not found with id: " + id));
    }

    @Override
    public AmenityRes findBynameAmenity(String name) {
        Amenity amenity = amenityRepository.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Amenity not found with name: " + name));

      //  List<Property> properties = amenity.getPropertyList();
       // properties.size();


        return mapper.toRes(amenity);
    }
    @Override
    public AmenityRes saveAmenity(AmenityReq amenity) {
        return mapper.toRes(amenityRepository.save(mapper.toEntity(amenity)));
    }

    @Override
    public AmenityRes updateAmenity(Long id, AmenityReq amenity) {
        Amenity existingAmenity = amenityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Amenity not found with id: " + id));
        Amenity updatedAmenity = mapper.toEntity(amenity);
        updatedAmenity.setId(existingAmenity.getId());
        amenityRepository.save(updatedAmenity);
        return mapper.toRes(updatedAmenity);
    }

    @Override
    public void deleteAmenityById(Long id) {
        Amenity existingAmenity = amenityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Amenity not found with id: " + id));
        amenityRepository.delete(existingAmenity);
    }

    @Override
    public Amenity findById(Long id) {
        return amenityRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Amenity not found with id: " + id));
    }


}