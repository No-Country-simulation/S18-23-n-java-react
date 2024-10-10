package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.PropertyRoomMapper;
import com.nocountry.rentify.dto.response.rooms.PropertyRoomDtoRes;
import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.repository.PropertyRoomRepository;
import com.nocountry.rentify.service.interfaces.PropertyRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyRoomServiceImpl implements PropertyRoomService {

    @Autowired
    private PropertyRoomRepository propertyRoomRepository;

    @Autowired
    private PropertyRoomMapper propertyRoomMapper;

    @Override
    public List<PropertyRoomDtoRes> findRoomsByPropertyId(Long propertyId) {
        List<PropertyRoom> propertyRoomList = this.propertyRoomRepository.findByPropertyId(propertyId);

        return propertyRoomList.stream().map(
                propertyRoomMapper::toDtoRes
        ).collect(Collectors.toList());
    }
}
