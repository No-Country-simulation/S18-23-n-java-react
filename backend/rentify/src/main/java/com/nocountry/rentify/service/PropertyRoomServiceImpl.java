package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.PropertyRoomMapper;
import com.nocountry.rentify.dto.response.rooms.PropertyRoomDtoRes;
import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.repository.PropertyRoomRepository;
import com.nocountry.rentify.service.interfaces.PropertyRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyRoomServiceImpl implements PropertyRoomService {
    private final PropertyRoomRepository propertyRoomRepository;
    private final PropertyRoomMapper propertyRoomMapper;

    @Override
    public List<PropertyRoomDtoRes> findRoomsByPropertyId(Long propertyId) {
        List<PropertyRoom> propertyRoomList = this.propertyRoomRepository.findByPropertyId(propertyId);

        return propertyRoomList.stream().map(
                propertyRoomMapper::toDtoRes
        ).collect(Collectors.toList());
    }
}
