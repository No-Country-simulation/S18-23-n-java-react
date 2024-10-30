package com.nocountry.rentify.controller.room;

import com.nocountry.rentify.dto.response.rooms.RoomRes;
import com.nocountry.rentify.service.interfaces.RoomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/room")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<RoomRes> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id-room}")
    @ResponseStatus(HttpStatus.OK)
    public RoomRes getRoomById(
            @PathVariable(value = "id-room") Integer idRoom
    ) {
        return roomService.getRoomById(idRoom);
    }
}
