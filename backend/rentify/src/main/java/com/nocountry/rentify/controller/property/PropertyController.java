package com.nocountry.rentify.controller.property;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.service.interfaces.PropertyService;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Between;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;
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
  public List<PropertyRes> getProperties(
      @And({
          @Spec(path = "country", params = "country", spec = Equal.class),
          @Spec(path = "province", params = "province", spec = Equal.class),
          @Spec(path = "rooms", params = "minRooms", spec = GreaterThanOrEqual.class),
          @Spec(path = "rooms", params = "maxRooms", spec = LessThanOrEqual.class),
          @Spec(path = "propertyType", params = "propertyType", spec = Equal.class),
          @Spec(path = "antiquity", params = "antiquity", spec = Equal.class),
          @Spec(path = "yearsOfAntiquity", params = "minYearsOfAntiquity", spec = GreaterThanOrEqual.class),
          @Spec(path = "yearsOfAntiquity", params = "maxYearsOfAntiquity", spec = LessThanOrEqual.class),
          @Spec(path = "price", params = "minPrice", spec = GreaterThanOrEqual.class),
          @Spec(path = "price", params = "maxPrice", spec = LessThanOrEqual.class),
          @Spec(path = "totalArea", params = "minTotalArea", spec = GreaterThanOrEqual.class ),
          @Spec(path = "builtArea", params = "maxBuiltArea", spec = LessThanOrEqual.class ),
          @Spec(path = "status", params = "status", spec = Equal.class)
      })Specification<Property> spec
      ) {
    return propertyService.getAllProperties(spec);
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
