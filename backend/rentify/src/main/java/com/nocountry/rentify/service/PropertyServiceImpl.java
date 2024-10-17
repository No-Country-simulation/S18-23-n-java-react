package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.PropertyMapper;
import com.nocountry.rentify.dto.request.property.PropertyMultimediaReq;
import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.model.entity.PropertyMultimedia;
import com.nocountry.rentify.repository.PropertyRepository;
import com.nocountry.rentify.service.interfaces.PropertyService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  @Transactional
  public PropertyRes addProperty(PropertyReq propertyReq) {
    Property property = mapper.toEntity(propertyReq);

      for (PropertyMultimediaReq multimediaReq : propertyReq.getMultimedia()) {
        PropertyMultimedia multimedia = mapper.toEntity(multimediaReq);
        multimedia.setProperty(property);
        property.getPropertyMultimedias().add(multimedia);
      }

    Property savedProperty = propertyRepository.save(property);
    return mapper.toRes(savedProperty);
  }
  @Override
  @Transactional
  public PropertyRes updateProperty(Long id, PropertyReq propertyReq) {
    Property existingProperty = propertyRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));

    Property updatedProperty = mapper.toEntity(propertyReq);
    updatedProperty.setId(id);
    updatedProperty.setOwner(existingProperty.getOwner());

    updatedProperty.getPropertyMultimedias().clear();

      for (PropertyMultimediaReq multimediaReq : propertyReq.getMultimedia()) {
        PropertyMultimedia multimedia = mapper.toEntity(multimediaReq);
        multimedia.setProperty(updatedProperty);
        updatedProperty.getPropertyMultimedias().add(multimedia);
      }

    Property savedProperty = propertyRepository.save(updatedProperty);

    return mapper.toRes(savedProperty);
  }

  @Override
  @Transactional
  public void deleteProperty(Long id) {
    propertyRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Property not found for id: " + id));
    propertyRepository.deleteById(id);
  }


}
