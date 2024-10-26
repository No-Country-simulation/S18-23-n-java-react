package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

public interface PropertyService {

  List<PropertyRes> getAllProperties(Specification<Property> specification);

  PropertyRes getProperty(Long id);

  List<PropertyRes> getPropertiesByUserId(Long userId);

  PropertyRes addProperty(PropertyReq property);

  PropertyRes updateProperty(Long id, PropertyReq property);

  void deleteProperty(Long id);


}
