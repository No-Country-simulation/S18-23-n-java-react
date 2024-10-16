package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.AmenityMapper;
import com.nocountry.rentify.dto.mapper.PropertyMapper;
import com.nocountry.rentify.dto.mapper.PropertyRoomMapper;
import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Amenity;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.repository.AmenityRepository;
import com.nocountry.rentify.repository.PropertyRepository;
import com.nocountry.rentify.service.interfaces.AmenityService;
import com.nocountry.rentify.service.interfaces.PropertyService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PropertyServiceImpl implements PropertyService {
  private final PropertyRepository propertyRepository;
  private final PropertyMapper mapper;
  private final PropertyRoomMapper roomMapper;
  private final AmenityService amenityService;

  @Transactional(readOnly = true)
  @Override
  public List<PropertyRes> getAllProperties(Specification<Property> specification) {
    return propertyRepository.findAll(specification).stream().map(mapper::toRes).toList();
  }

  @Transactional(readOnly = true)
  @Override
  public PropertyRes getProperty(Long id) {
    Property property = propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
    return mapper.toRes(property);
  }

  @Transactional
  @Override
  public PropertyRes addProperty(PropertyReq propertyReq) {
    Property property = mapper.toEntity(propertyReq);

    Set<PropertyRoom> rooms = propertyReq.getRooms().stream().map(pr-> roomMapper.toEntity(pr, property)).collect(Collectors.toSet());
    property.setRooms(rooms);

    Set<Amenity> amenities = propertyReq.getAmenities().stream().map(amenityService::findById).collect(Collectors.toSet());
    property.setAmenities(amenities);

    return mapper.toRes(propertyRepository.save(property));
  }

  @Transactional
  @Override
  public PropertyRes updateProperty(Long id, PropertyReq propertyReq) {
    propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
    var updatedProperty = mapper.toEntity(propertyReq);

    Set<PropertyRoom> rooms = propertyReq.getRooms().stream().map(pr-> roomMapper.toEntity(pr, updatedProperty)).collect(Collectors.toSet());
    updatedProperty.setRooms(rooms);

    Set<Amenity> amenities = propertyReq.getAmenities().stream().map(amenityService::findById).collect(Collectors.toSet());
    updatedProperty.setAmenities(amenities);

    updatedProperty.setId(id);
    propertyRepository.save(updatedProperty);
    return mapper.toRes(updatedProperty);
  }

  @Transactional
  @Override
  public void deleteProperty(Long id) {
    propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
    propertyRepository.deleteById(id);
  }


}
