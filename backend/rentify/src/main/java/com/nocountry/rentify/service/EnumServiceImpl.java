package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.response.property.EnumRes;
import com.nocountry.rentify.model.enums.*;
import com.nocountry.rentify.service.interfaces.EnumService;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class EnumServiceImpl implements EnumService {

    @Override
    public List<EnumRes> getAllStatuses() {
        return getEnumValues(Status.values());
    }

    @Override
    public List<EnumRes> getAllAntiquities() {
        return getEnumValues(Antiquity.values());
    }

    @Override
    public List<EnumRes> getAllPropertyTypes() {
        return getEnumValues(PropertyType.values());
    }

    @Override
    public List<EnumRes> getAllPropertyMultimediaTypes() {
        return getEnumValues(PropertyMultimediaType.values());
    }

    /**
     * Converts an array of enums into a list of {@link EnumRes}.
     *
     * This method accepts any enum that implements {@link TranslatableEnum},
     * generating a list with the enum constant name and its translated value.
     *
     * @param <E> the enum type that extends {@link Enum} and {@link TranslatableEnum}.
     * @param enumValues an array of enum values to convert.
     * @return a list of {@link EnumRes} with the name and translation of each constant.
     */
    private <E extends Enum<E> & TranslatableEnum> List<EnumRes> getEnumValues(E[] enumValues) {
        return Arrays.stream(enumValues)
                .map(enumVal -> new EnumRes(enumVal.name(), enumVal.getTranslatedName()))
                .collect(Collectors.toList());
    }
}