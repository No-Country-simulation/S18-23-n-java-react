package com.nocountry.rentify.dto.response.amenity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AmenityRes {

    private Long id;

    private String name;
   // private List<PropertyRes> properties;
}
