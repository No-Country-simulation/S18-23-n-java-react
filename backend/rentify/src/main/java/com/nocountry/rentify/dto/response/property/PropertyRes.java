package com.nocountry.rentify.dto.response.property;

import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.model.enums.Antiquity;
import com.nocountry.rentify.model.enums.PropertyType;
import com.nocountry.rentify.model.enums.Status;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;

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
  private int rooms;
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
}
