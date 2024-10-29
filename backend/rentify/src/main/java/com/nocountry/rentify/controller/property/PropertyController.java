package com.nocountry.rentify.controller.property;

import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.model.entity.Property;
import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.model.entity.Room;
import com.nocountry.rentify.repository.RoomRepository;
import com.nocountry.rentify.service.interfaces.PropertyService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Join;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/properties")
public class PropertyController {
  private final RoomRepository roomRepository;
  private final PropertyService propertyService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<PropertyRes> getProperties(
      @Join(path = "amenities", alias = "a")
      @And({
          @Spec(path = "a.name", params = "amenities", spec = In.class),
          @Spec(path = "country", params = "country", spec = Like.class),
          @Spec(path = "city", params = "city", spec = Like.class),
          @Spec(path = "province", params = "province", spec = Like.class),
          @Spec(path = "numberOfRooms", params = "minRooms", spec = GreaterThanOrEqual.class),
          @Spec(path = "numberOfRooms", params = "maxRooms", spec = LessThanOrEqual.class),
          @Spec(path = "propertyType", params = "propertyType", spec = Equal.class),
          @Spec(path = "antiquity", params = "antiquity", spec = Equal.class),
          @Spec(path = "yearsOfAntiquity", params = "minYearsOfAntiquity", spec = GreaterThanOrEqual.class),
          @Spec(path = "yearsOfAntiquity", params = "maxYearsOfAntiquity", spec = LessThanOrEqual.class),
          @Spec(path = "price", params = "minPrice", spec = GreaterThanOrEqual.class),
          @Spec(path = "price", params = "maxPrice", spec = LessThanOrEqual.class),
          @Spec(path = "totalArea", params = "minTotalArea", spec = GreaterThanOrEqual.class),
          @Spec(path = "totalArea", params = "maxTotalArea", spec = LessThanOrEqual.class),
          @Spec(path = "builtArea", params = "minBuiltArea", spec = GreaterThanOrEqual.class),
          @Spec(path = "builtArea", params = "maxBuiltArea", spec = LessThanOrEqual.class),
          @Spec(path = "status", params = "status", spec = Equal.class)}) Specification<Property> spec,
      @RequestParam(name = "rooms", required = false) List<String> rooms
      ) {
    return propertyService.getAllProperties(spec.and(hasRooms(rooms)));
  }

  @GetMapping("/user/{id}")
  @ResponseStatus(HttpStatus.OK)
  public List<PropertyRes> getPropertiesByUserId(@PathVariable Long id) {
    return propertyService.getPropertiesByUserId(id);
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


  public Specification<Property> hasRooms(List<String> roomNames) {
    return (Root<Property> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {
      if (roomNames == null || roomNames.isEmpty()) {
        return builder.conjunction(); // Esto no agrega condiciones, es como un "true"
      }

      List<Integer> roomIds = new ArrayList<>();
      for(String roomName : roomNames){
        Room room = roomRepository.findByName(roomName);
        if(room != null)
          roomIds.add(room.getId());
      }

      // Realiza el JOIN entre Property y PropertyRoom
      jakarta.persistence.criteria.Join<Property, PropertyRoom>
          propertyRoomJoin = root.join("rooms", JoinType.LEFT);
      // Realiza el JOIN entre PropertyRoom y Room
      jakarta.persistence.criteria.Join<PropertyRoom, Room> roomJoin = propertyRoomJoin.join("room", JoinType.LEFT);

      // Aplica la condición IN para el conjunto de roomIds
      Predicate roomsInClause = roomJoin.get("id").in(roomIds);

      // Agrega GROUP BY en Property id
      query.groupBy(root.get("id"));

      // Filtra las propiedades que tienen exactamente la cantidad de roomIds en la lista
      query.having(builder.equal(builder.countDistinct(roomJoin.get("id")), roomIds.size()));

      // Retorna la condición IN en el predicado principal
      return roomsInClause;
    };
  }


}
