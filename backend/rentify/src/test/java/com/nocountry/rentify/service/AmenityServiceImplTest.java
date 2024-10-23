package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.AmenityMapper;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.model.entity.Amenity;
import com.nocountry.rentify.repository.AmenityRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AmenityServiceImplTest {
    @Mock
    private AmenityRepository amenityRepository;

    @Mock
    private AmenityMapper amenityMapper;

    @InjectMocks
    private AmenityServiceImpl amenityService;

    private Amenity amenity;
    private AmenityRes amenityRes;

    @BeforeEach
    void setUp() {
        amenity = new Amenity(1L,"Amenity Name", new ArrayList<>());
        amenityRes = new AmenityRes(1L,"Amenity Name");
    }

    @AfterEach
    void tearDown() {
        reset(amenityRepository, amenityMapper);
    }

    @Test
    void shouldReturnAllAmenity() {
        //given
        when(amenityRepository.findAll()).thenReturn(Arrays.asList(amenity));
        when(amenityMapper.toRes(amenity)).thenReturn(amenityRes);

        //when
        List<AmenityRes> result = amenityService.findAllAmenity();

        //then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(amenityRes, result.get(0));
        verify(amenityRepository).findAll();
        verify(amenityMapper).toRes(amenity);
    }

    @Test
    void shouldFindAmenityById_Found() {
        //given
        Long amenityId = 1L;
        when(amenityRepository.findById(amenityId)).thenReturn(Optional.of(amenity));
        when(amenityMapper.toRes(amenity)).thenReturn(amenityRes);

        //when
        AmenityRes result = amenityService.findAmenityById(amenityId);

        //then
        assertNotNull(result);
        assertEquals(amenityRes, result);
        verify(amenityRepository).findById(amenityId);
        verify(amenityMapper).toRes(amenity);
    }

    @Test
    void shouldThrowEntityNotFoundException_WhenAmenityNotFound() {
        //given
        Long amenityId = 1L;
        when(amenityRepository.findById(amenityId)).thenReturn(Optional.empty());

        //when
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            amenityService.findAmenityById(amenityId);
        });

        //then
        assertEquals("Amenity not found with id: 1", thrown.getMessage());
        verify(amenityRepository).findById(amenityId);
        verify(amenityMapper, never()).toRes(any(Amenity.class));
    }
}