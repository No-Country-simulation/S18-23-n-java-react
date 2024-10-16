package com.nocountry.rentify.controller.room;

import com.nocountry.rentify.dto.response.rooms.RoomRes;
import com.nocountry.rentify.service.interfaces.RoomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base}/room")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomRes>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/{id-room}")
    public ResponseEntity<RoomRes> getRoomById(
            @PathVariable(value = "id-room") Integer idRoom
    ) {
        return ResponseEntity.ok(roomService.getRoomById(idRoom));
    }
}
