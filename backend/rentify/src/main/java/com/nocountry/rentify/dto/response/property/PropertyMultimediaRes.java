package com.nocountry.rentify.dto.response.property;

import com.nocountry.rentify.model.enums.PropertyMultimediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PropertyMultimediaRes {
    @NotNull(message = "type must not be null")
    private PropertyMultimediaType type;

    @NotBlank(message = "url must not be empty")
    private String url;
}