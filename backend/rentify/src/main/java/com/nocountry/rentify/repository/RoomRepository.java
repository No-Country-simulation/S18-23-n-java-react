package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
  Room findByName(String name);
}
