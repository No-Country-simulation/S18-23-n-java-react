package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.mapper.PropertyMapper;
import com.nocountry.rentify.dto.mapper.PropertyRoomMapper;
import com.nocountry.rentify.dto.request.property.PropertyMultimediaReq;
import com.nocountry.rentify.dto.request.property.PropertyReq;
import com.nocountry.rentify.dto.request.room.PropertyRoomReq;
import com.nocountry.rentify.dto.response.amenity.AmenityRes;
import com.nocountry.rentify.dto.response.feature.FeatureRes;
import com.nocountry.rentify.dto.response.property.PropertyMultimediaRes;
import com.nocountry.rentify.dto.response.property.PropertyRes;
import com.nocountry.rentify.dto.response.rooms.PropertyRoomRes;
import com.nocountry.rentify.model.entity.*;
import com.nocountry.rentify.model.enums.PropertyMultimediaType;
import com.nocountry.rentify.model.enums.PropertyType;
import com.nocountry.rentify.repository.PropertyRepository;
import com.nocountry.rentify.service.interfaces.AmenityService;
import com.nocountry.rentify.service.interfaces.FeatureService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PropertyServiceImplTest {
    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private PropertyMapper propertyMapper;

    @Mock
    private PropertyRoomMapper roomMapper;

    @Mock
    private AmenityService amenityService;

    @Mock
    private FeatureService featureService;

    @Mock
    Specification<Property> spec;

    @InjectMocks
    private PropertyServiceImpl propertyService;

    private Property property1;
    private Property property2;
    private PropertyRes propertyRes1;
    private PropertyRes propertyRes2;

    @BeforeEach
    void setUp() {
        property1 = Property.builder()
                .id(1L)
                .streetNumber("8773")
                .numberOfRooms(4)
                .propertyType(PropertyType.APARTMENT)
                .build();

        property2 = Property.builder()
                .id(2L)
                .streetNumber("123")
                .numberOfRooms(3)
                .propertyType(PropertyType.HOUSE)
                .build();

        propertyRes1 = PropertyRes.builder()
                .id(1L)
                .streetNumber("8773")
                .numberOfRooms(4)
                .propertyType(PropertyType.APARTMENT)
                .build();
        propertyRes2 = PropertyRes.builder()
                .id(2L)
                .streetNumber("123")
                .numberOfRooms(3)
                .propertyType(PropertyType.HOUSE)
                .build();;
    }

    @AfterEach
    void tearDown() {
        reset(propertyRepository, propertyMapper, roomMapper, amenityService, featureService, spec);
    }

    @Test
    void shouldReturnAllProperties() {
        //given
        when(propertyRepository.findAll(spec)).thenReturn(Arrays.asList(property1, property2));
        when(propertyMapper.toRes(property1)).thenReturn(propertyRes1);
        when(propertyMapper.toRes(property2)).thenReturn(propertyRes2);

        //when
        List<PropertyRes> result = propertyService.getAllProperties(spec);

        //then
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(propertyRepository).findAll(spec);
        verify(propertyMapper).toRes(property1);
        verify(propertyMapper).toRes(property2);
    }

    @Test
    void shouldReturnPropertyById() {
        //given
        Long propertyId = 2L;
        when(propertyRepository.findById(propertyId)).thenReturn(Optional.of(property2));
        when(propertyMapper.toRes(property2)).thenReturn(propertyRes2);

        //when
        PropertyRes result = propertyService.getProperty(propertyId);

        //then
        assertEquals(propertyRes2, result);
        verify(propertyRepository).findById(propertyId);
        verify(propertyMapper).toRes(property2);
    }

    @Test
    void shouldThrowEntityNotFoundException_WhenPropertyNotFound() {
        //given
        Long propertyId = 4L;
        when(propertyRepository.findById(propertyId)).thenReturn(Optional.empty());

        //when
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () -> {
            propertyService.getProperty(propertyId);
        });

        //then
        assertEquals("Property not found for id: " + propertyId, thrown.getMessage());
        verify(propertyRepository).findById(propertyId);
    }


     @Test
    void shouldSavePropertySuccessfully() {
        // given
        PropertyReq propertyReq = PropertyReq.builder()
                .title("Oficina")
                .features(new HashSet<>(Arrays.asList(1L, 2L)))
                .amenities(new HashSet<>(Collections.singleton(1L)))
                .multimedia(new HashSet<>(Collections.singleton(new PropertyMultimediaReq(PropertyMultimediaType.VIDEO,"/"))))
                .rooms(new HashSet<>(Collections.singleton(new PropertyRoomReq(1,2))))
                .build();

        Amenity amenity = new Amenity(1L,"aire acondicionado", new ArrayList<>());
        List<Feature> features = Arrays.asList(
             new Feature(1L,"uso comercial", null),
             new Feature(2L,"permite mascotas", null)
        );
        PropertyMultimedia propertyMultimedia = new PropertyMultimedia(1L, null, PropertyMultimediaType.VIDEO,"/");
        PropertyRoom propertyRoom = new PropertyRoom(null, null, 2);
        Property property = Property.builder()
                .title("Oficina")
                .features(new HashSet<>(features))
                .amenities(new HashSet<>(Collections.singleton(amenity)))
                .propertyMultimedias(new HashSet<>(Collections.singleton(propertyMultimedia)))
                .rooms(new HashSet<>(Collections.singleton(propertyRoom)))
                .build();

        PropertyRes propertyRes = PropertyRes.builder()
                .title("Oficina")
                .features(new HashSet<>(Arrays.asList(
                    new FeatureRes(1L,"uso comercial"),
                    new FeatureRes(2L,"permite mascotas")
                )))
                .amenities(new HashSet<>(Collections.singleton(new AmenityRes(1L, "aire acondicionado"))))
                .multimedia(new HashSet<>(Collections.singleton(new PropertyMultimediaRes(1L, PropertyMultimediaType.VIDEO,"/"))))
                .rooms(new HashSet<>(Collections.singleton(new PropertyRoomRes("room",2))))
                .build();

        when(propertyMapper.toEntity(propertyReq)).thenReturn(property);
        when(propertyMapper.toEntity(any(PropertyMultimediaReq.class))).thenReturn(propertyMultimedia);
        when(amenityService.findById(1L)).thenReturn(amenity);
        when(propertyRepository.save(property)).thenReturn(property);
        when(propertyMapper.toRes(property)).thenReturn(propertyRes);

        // when
        PropertyRes result = propertyService.addProperty(propertyReq);

        // then
        assertNotNull(result);
        assertEquals("Oficina", result.getTitle());
        verify(propertyMapper).toEntity(propertyReq);
        verify(propertyMapper).toEntity(any(PropertyMultimediaReq.class));
        verify(propertyRepository).save(property);
        verify(propertyMapper).toRes(property);
        verify(amenityService).findById(anyLong());
    }

    @Test
    void shouldDeleteProperty_WhenPropertyExists() {
        Long propertyId = 1L;
        when(propertyRepository.findById(propertyId)).thenReturn(Optional.of(property1));

        propertyService.deleteProperty(propertyId);

        verify(propertyRepository).findById(propertyId);
        verify(propertyRepository).deleteById(propertyId);
    }

    @Test
    void shouldThrowException_WhenPropertyDoesNotExist() {
        // given
        Long propertyId = 45L;
        when(propertyRepository.findById(propertyId)).thenReturn(Optional.empty());

        // when
        assertThrows(EntityNotFoundException.class, () -> propertyService.deleteProperty(propertyId));

        // then
        verify(propertyRepository).findById(propertyId);
        verify(propertyRepository, never()).deleteById(propertyId);
    }

    @Test
    void shouldUpdatePropertySuccessfully() {

    }
}