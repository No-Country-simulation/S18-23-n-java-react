package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.AmenityMapper;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.repository.AmenityRepository;
import com.nocountry.rentify.service.interfaces.AmenityService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AmenityServiceImpl implements AmenityService {
    private final AmenityRepository amenityRepository;
    private final AmenityMapper mapper;

    @Transactional(readOnly = true)
    @Override
    public List<AmenityRes> findAllAmenity() {
        return amenityRepository.findAll().stream()
                .map(mapper::toResp)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public AmenityRes findAmenityById(Long id) {
        return amenityRepository.findById(id)
                .map(mapper::toResp)
                .orElseThrow(() -> new EntityNotFoundException("Amenity not found with id: " + id));
    }
}
