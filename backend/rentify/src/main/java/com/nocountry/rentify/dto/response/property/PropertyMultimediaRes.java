package com.nocountry.rentify.dto.response.property;

import com.nocountry.rentify.model.enums.PropertyMultimediaType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PropertyMultimediaRes {
    private Long id;
    private PropertyMultimediaType type;
    private String url;
}