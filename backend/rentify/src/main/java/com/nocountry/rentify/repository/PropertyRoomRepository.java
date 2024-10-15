package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.PropertyRoom;
import com.nocountry.rentify.model.entity.PropertyRoomPK;
import com.nocountry.rentify.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRoomRepository extends JpaRepository<PropertyRoom, PropertyRoomPK> {

    @Query("SELECT pr FROM PropertyRoom pr WHERE pr.property.id = :propertyId")
    List<PropertyRoom> findByPropertyId(@Param("propertyId") Long propertyId);

//    @Query("SELECT pr FROM PropertyRoom pr WHERE pr.")
//    PropertyRoom findByRoomId(@Param("roomId") Long roomId);
}
