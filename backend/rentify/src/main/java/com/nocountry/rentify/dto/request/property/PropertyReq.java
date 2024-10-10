package com.nocountry.rentify.dto.request.property;

import com.nocountry.rentify.model.enums.Antiquity;
import com.nocountry.rentify.model.enums.PropertyType;
import com.nocountry.rentify.model.enums.Status;
import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
  @NotBlank(message = "propertyType must not be empty")
  private PropertyType propertyType;
  @NotNull(message = "rooms must not be empty")
  @Positive(message = "rooms must be a positive number")
  private int rooms;
  @NotBlank(message = "antiquity must not be empty")
  private Antiquity antiquity;
  @Positive(message = "yearsOfAntiquity must be a positive number")
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
  @NotNull(message = "maintanceFees must not be null")
  private BigDecimal maintanceFees;
  @NotBlank(message = "title must not be empty")
  private String title;
  @NotBlank(message = "description must not be empty")
  private String description;
  @NotBlank(message = "status must not be empty")
  private Status status;

}
