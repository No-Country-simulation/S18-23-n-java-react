package com.nocountry.rentify.dto.mapper;

import com.nocountry.rentify.dto.request.UserReq;
import com.nocountry.rentify.dto.response.UserRes;
import com.nocountry.rentify.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "email", expression = "java(userReq.email().toLowerCase())")
  User toEntity(UserReq userReq);

  UserRes toResponse (User user);
}


