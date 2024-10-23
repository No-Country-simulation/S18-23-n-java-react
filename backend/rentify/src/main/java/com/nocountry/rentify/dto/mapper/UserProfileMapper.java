package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.UserProfileReq;
import com.nocountry.rentify.dto.response.UserProfileRes;
import com.nocountry.rentify.model.entity.User;
import com.nocountry.rentify.model.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserProfileMapper  {

    @Mapping(source = "username", target = "username")
    @Mapping(target = "name", expression = "java(CustomMapperUtil.mapName(name,name))")
    @Mapping(target = "lastName", expression = "java(CustomMapperUtil.mapName(lastName,lastName))")
    @Mapping(source = "user", target = "user")
    UserProfile toEntity(String username,String name, String lastName, User user);

    @Mapping(source = "lastName", target = "lastname")
    UserProfileRes toResponse(UserProfile userProfile);

    @Mapping(target = "username", expression = "java(CustomMapperUtil.mapUsername(userProfileReq.username(), userProfile.getUsername()))")
    @Mapping(target = "name", expression = "java(CustomMapperUtil.mapName(userProfileReq.name(), userProfile.getName()))")
    @Mapping(target = "lastName", expression = "java(CustomMapperUtil.mapName(userProfileReq.lastname(), userProfile.getLastName()))")
    @Mapping(target = "phone", expression = "java(CustomMapperUtil.mapPhone(userProfileReq.phone(), userProfile.getPhone()))")
    @Mapping(target = "photo", expression = "java(CustomMapperUtil.mapPhoto(userProfileReq.photo(), userProfile.getPhoto(), userProfileReq.isRemovePhoto()))")
    void updateEntity(UserProfileReq userProfileReq, @MappingTarget UserProfile userProfile);

}


class CustomMapperUtil {

    public static String mapUsername(String newUsername, String currentUsername) {
        if (newUsername!= null &&!newUsername.isBlank()) {
            return newUsername;
        }
        return currentUsername;
    }

    public static String mapName(String newValue, String currentValue) {
        if (newValue != null && !newValue.isBlank()) {
            newValue = capitalizeName(newValue);
            return newValue;
        }
        return currentValue;
    }

    public static String capitalizeName(String name) {
        String[] words = name.trim().toLowerCase().split("\\s+");
        StringBuilder formattedName = new StringBuilder();

        for (String word : words) {
            if (!word.isEmpty()) {
                formattedName.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1))
                        .append(" ");
            }
        }
        return formattedName.toString().trim();
    }

    public static String mapPhone(String newPhone, String currentPhone) {
        if (newPhone != null && !newPhone.isBlank()) {
            return newPhone;
        }
        return currentPhone;
    }

    public static String mapPhoto(String newPhoto, String currentPhoto, boolean isRemovePhoto) {
        if (isRemovePhoto) {
            return null;
        }
        if (newPhoto != null && !newPhoto.isBlank()) {
            return newPhoto;
        }
        return currentPhoto;
    }
}
