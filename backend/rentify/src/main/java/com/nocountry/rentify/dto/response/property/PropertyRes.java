package com.nocountry.rentify.dto.response.property;

import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.dto.response.feature.FeatureRes;
import com.nocountry.rentify.dto.response.rooms.PropertyRoomRes;
import com.nocountry.rentify.model.enums.Antiquity;
import com.nocountry.rentify.model.enums.PropertyType;
import com.nocountry.rentify.model.enums.Status;
import java.math.BigDecimal;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class PropertyRes {

  private Long id;
  private UserRes owner;
  private String country;
  private String province;
  private String city;
  private String streetName;
  private String streetNumber;
  private int numberOfRooms;
  private PropertyType propertyType;
  private Antiquity antiquity;
  private int yearsOfAntiquity;
  private BigDecimal price;
  private BigDecimal maintenanceFees;
  private String title;
  private String description;
  private BigDecimal totalArea;
  private BigDecimal builtArea;
  private Status status;
  private Set<PropertyRoomRes> rooms;
  private Set<AmenityRes> amenities;
  private Set<FeatureRes> features;
  private Set<PropertyMultimediaRes> multimedia;
}
