package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.RoomMapper;
import com.nocountry.rentify.dto.response.rooms.RoomDtoRes;
import com.nocountry.rentify.model.entity.Room;
import com.nocountry.rentify.repository.RoomRepository;
import com.nocountry.rentify.service.interfaces.RoomService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomMapper roomMapper;

    @Override
    public List<RoomDtoRes> getAllRooms() {
        return this.roomRepository.findAll().stream().map(
                roomMapper::toDtoRes
        ).collect(Collectors.toList());
    }

    @Override
    public RoomDtoRes getRoomById(Integer id) {
        Room room = this.roomRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Room with id " + id + " not found")
        );

        return roomMapper.toDtoRes(room);
    }
}
