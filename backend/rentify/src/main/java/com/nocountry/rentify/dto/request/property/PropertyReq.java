package com.nocountry.rentify.dto.request.property;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PropertyReq {

  private Long ownerId;
  private String country;
  private String province;
  private String city;
  private String streetName;
  private String streetNumber;
  private int rooms;
  //private Antiquity antiquity;
  private int yearsOfAntiquity;
  private BigDecimal price;
  private BigDecimal maintanceFees;
  private String title;
  private String description;
  private BigDecimal totalArea;
  private BigDecimal builtArea;
  //private Status status;

}
