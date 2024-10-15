package com.nocountry.rentify.dto.request.property;

import com.nocountry.rentify.dto.request.room.PropertyRoomReq;
import com.nocountry.rentify.model.entity.Amenity;
import com.nocountry.rentify.model.entity.Feature;
import com.nocountry.rentify.model.enums.Antiquity;
import com.nocountry.rentify.model.enums.PropertyType;
import com.nocountry.rentify.model.enums.Status;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PropertyReq {

  @NotNull(message = "ownerId must not be null")
  private Long ownerId;
  @NotBlank(message = "country must not be empty")
  private String country;
  @NotBlank(message = "province must not be empty")
  private String province;
  @NotBlank(message = "city must not be empty")
  private String city;
  @NotBlank(message = "streetName must not be empty")
  private String streetName;
  @NotBlank(message = "streetNumber must not be empty")
  private String streetNumber;
  @NotNull(message = "propertyType must not be null")
  private PropertyType propertyType;
  @NotNull(message = "rooms must not be empty")
  @Positive(message = "rooms must be a positive number")
  private int numberOfRooms;
  @NotNull(message = "antiquity must not be null")
  private Antiquity antiquity;
  @PositiveOrZero(message = "yearsOfAntiquity must be a positive or zero")
  private int yearsOfAntiquity;
  @NotNull(message = "totalArea must not be null")
  @Positive(message = "totalArea must be a positive number")
  private BigDecimal totalArea;
  @NotNull(message = "builtArea must not be null")
  @Positive(message = "builtArea must be a positive number")
  private BigDecimal builtArea;
  @NotNull(message = "price must not be null")
  @Positive(message = "price must be a positive number")
  private BigDecimal price;
  @NotNull(message = "maintenanceFees must not be null")
  private BigDecimal maintenanceFees;
  @NotBlank(message = "title must not be empty")
  private String title;
  @NotBlank(message = "description must not be empty")
  private String description;
  @NotNull(message = "status must not be null")
  private Status status;
  @Valid
  private List<PropertyRoomReq> rooms;

  @Valid
  private List<Feature> features;

  @Valid
  private List<Amenity> amenities;
}
