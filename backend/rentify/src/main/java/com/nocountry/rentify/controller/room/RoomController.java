package com.nocountry.rentify.controller.room;

import com.nocountry.rentify.dto.response.rooms.RoomRes;
import com.nocountry.rentify.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoomRes getRoomById(@PathVariable Integer id) {
        return roomService.getRoomById(id);
    }

    @GetMapping("/name")
    @ResponseStatus(HttpStatus.OK)
    public RoomRes getRoomByName(@RequestParam String name) {
        return roomService.getRoomByName(name);
    }
}
