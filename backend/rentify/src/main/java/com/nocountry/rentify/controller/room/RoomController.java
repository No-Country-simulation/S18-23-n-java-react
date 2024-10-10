package com.nocountry.rentify.controller.room;

import com.nocountry.rentify.dto.response.rooms.RoomDtoRes;
import com.nocountry.rentify.service.interfaces.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.base}/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDtoRes>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/{id-room}")
    public ResponseEntity<RoomDtoRes> getRoomById(
            @PathVariable(value = "id-room") Integer idRoom
    ) {
        return ResponseEntity.ok(roomService.getRoomById(idRoom));
    }
}
