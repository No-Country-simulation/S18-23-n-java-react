package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.RoomMapper;
import com.nocountry.rentify.dto.response.rooms.RoomDtoRes;
import com.nocountry.rentify.model.entity.Room;
import com.nocountry.rentify.repository.RoomRepository;
import com.nocountry.rentify.service.interfaces.RoomService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    @Override
    @Transactional(readOnly = true)
    public List<RoomDtoRes> getAllRooms() {
        return this.roomRepository.findAll().stream().map(
                roomMapper::toDtoRes
        ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RoomDtoRes getRoomById(Integer id) {
        Room room = this.roomRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Room with id " + id + " not found")
        );

        return roomMapper.toDtoRes(room);
    }
}
