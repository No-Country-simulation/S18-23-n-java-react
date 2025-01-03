package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.PropertyRoomMapper;
import com.nocountry.rentify.dto.response.rooms.PropertyRoomRes;
import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.repository.PropertyRoomRepository;
import com.nocountry.rentify.service.interfaces.PropertyRoomService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PropertyRoomServiceImpl implements PropertyRoomService {
    private final PropertyRoomRepository propertyRoomRepository;
    private final PropertyRoomMapper propertyRoomMapper;

    @Transactional(readOnly = true)
    @Override
    public List<PropertyRoomRes> findRoomsByPropertyId(Long propertyId) {
        List<PropertyRoom> propertyRoomList = this.propertyRoomRepository.findByPropertyId(propertyId);

        return propertyRoomList.stream().map(
                propertyRoomMapper::toDtoRes
        ).collect(Collectors.toList());
    }
}
