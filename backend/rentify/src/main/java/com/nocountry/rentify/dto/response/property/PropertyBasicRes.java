package com.nocountry.rentify.dto.response.property;

import com.nocountry.rentify.dto.response.rooms.PropertyRoomRes;
import java.math.BigDecimal;
import java.util.Set;
import lombok.Data;

@Data
public class PropertyBasicRes {
  private Long id;
  private Long ownerId;
  private String country;
  private String province;
  private String city;
  private int numberOfRooms;
  private BigDecimal price;
  private String title;
  private String description;
  private BigDecimal totalArea;
  private BigDecimal builtArea;
  private Set<PropertyRoomRes> rooms;
  private Set<PropertyMultimediaRes> multimedia;
}
