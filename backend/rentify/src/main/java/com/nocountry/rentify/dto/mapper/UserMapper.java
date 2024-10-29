package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.UserReq;
import com.nocountry.rentify.dto.response.LoginRes;
import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "email", expression = "java(userReq.email().toLowerCase())")
  User toEntity(UserReq userReq);

  UserRes toResponse (User user);

  @Mapping(source = "user.id", target = "id")
  @Mapping(source = "user.profile.username", target = "username")
  @Mapping(source = "user.profile.name", target = "name")
  @Mapping(source = "user.profile.lastName", target = "lastname")
  @Mapping(source = "user.profile.photo", target = "photo")
  @Mapping(source = "user.role.name", target = "role")
  @Mapping(source = "token", target = "token")
  LoginRes toLoginRes(User user, String token);
}


