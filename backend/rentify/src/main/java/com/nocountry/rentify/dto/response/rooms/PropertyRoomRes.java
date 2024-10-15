package com.nocountry.rentify.dto.response.rooms;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyRoomRes {
    private String roomName;
    private Integer quantity;
}
