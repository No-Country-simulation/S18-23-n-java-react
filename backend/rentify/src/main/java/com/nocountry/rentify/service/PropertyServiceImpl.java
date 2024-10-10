package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.PropertyMapper;
import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.repository.PropertyRepository;
import com.nocountry.rentify.service.interfaces.PropertyService;
import java.util.List;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PropertyServiceImpl implements PropertyService {
  private final PropertyRepository propertyRepository;
  private final PropertyMapper mapper;

  @Override
  public List<PropertyRes> getAllProperties(Specification<Property> specification) {
    return propertyRepository.findAll(specification).stream().map(mapper::toRes).toList();
  }

  @Override
  public PropertyRes getProperty(Long id) {
    return propertyRepository.findById(id).map(mapper::toRes).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
  }

  @Override
  public PropertyRes addProperty(PropertyReq property) {
    return mapper.toRes(propertyRepository.save(mapper.toEntity(property)));
  }

  @Override
  public PropertyRes updateProperty(Long id, PropertyReq property) {
    propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
    var updatedProperty = mapper.toEntity(property);
    updatedProperty.setId(id);
    propertyRepository.save(updatedProperty);
    return mapper.toRes(updatedProperty);
  }

  @Override
  public void deleteProperty(Long id) {
    propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
    propertyRepository.deleteById(id);
  }


}
