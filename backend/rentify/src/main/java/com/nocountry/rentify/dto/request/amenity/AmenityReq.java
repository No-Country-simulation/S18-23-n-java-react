package com.nocountry.rentify.dto.request.amenity;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmenityReq {

    @NotBlank(message = "name must not be empty")
    private String name;

}
