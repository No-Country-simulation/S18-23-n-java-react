package com.nocountry.rentify.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum PropertyMultimediaType implements TranslatableEnum{
    IMAGE("Imagen"),
    VIDEO("Video");

    private final String translatedName;
}
