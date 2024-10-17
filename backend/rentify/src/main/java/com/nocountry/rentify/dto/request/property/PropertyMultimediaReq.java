package com.nocountry.rentify.dto.request.property;
import com.nocountry.rentify.model.enums.PropertyMultimediaType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class PropertyMultimediaReq {
    @NotNull(message = "Type must not be null")
    private PropertyMultimediaType type;
    @NotNull(message = "url must not be null")
    private String url;
}

