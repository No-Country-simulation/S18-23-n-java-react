package com.nocountry.rentify.controller.property;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.service.interfaces.PropertyService;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/properties")
public class PropertyController {

  private final PropertyService propertyService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<PropertyRes> getProperties() {
    return propertyService.getAllProperties();
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public PropertyRes getProperty(@PathVariable Long id) {
    return propertyService.getProperty(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PropertyRes createProperty(@RequestBody @Valid PropertyReq propertyReq) {
    return propertyService.addProperty(propertyReq);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public PropertyRes updateProperty(@PathVariable Long id, @RequestBody @Valid PropertyReq propertyReq) {
    return propertyService.updateProperty(id, propertyReq);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteProperty(@PathVariable Long id) {
    propertyService.deleteProperty(id);
  }

}
