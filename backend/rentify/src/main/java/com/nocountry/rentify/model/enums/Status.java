package com.nocountry.rentify.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Status implements TranslatableEnum {
    AVAILABLE("Disponible"),
    RENTED("Alquilado"),
    MAINTENANCE("En mantenimiento"),
    UNAVAILABLE("No disponible");

    private final String translatedName;
}