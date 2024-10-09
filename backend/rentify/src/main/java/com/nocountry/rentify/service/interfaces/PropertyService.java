package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import java.util.List;

public interface PropertyService {

  List<PropertyRes> getAllProperties();

  PropertyRes getProperty(Long id);

  PropertyRes addProperty(PropertyReq property);

  PropertyRes updateProperty(Long id, PropertyReq property);

  void deleteProperty(Long id);


}
