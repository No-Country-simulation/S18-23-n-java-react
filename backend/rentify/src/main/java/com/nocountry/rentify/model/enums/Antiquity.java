package com.nocountry.rentify.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Antiquity implements TranslatableEnum{
    BRAND_NEW("A estrenar"),
    YEARS_OF_ANTIQUITY("Años de antigüedad"),
    UNDER_CONSTRUCTION("En construcción");

    private final String translatedName;
}
