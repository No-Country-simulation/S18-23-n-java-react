package com.nocountry.rentify.dto.request.room;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PropertyRoomReq {
  @NotNull(message = "id must not be null")
  private Integer id;
  @Positive(message = "quantity must be a positive number")
  @NotNull(message = "quantity must not be null")
  private int quantity;
}
