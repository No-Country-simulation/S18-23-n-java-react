package com.nocountry.rentify.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "property_room")
@IdClass(PropertyRoomPK.class)
public class PropertyRoom {
    @Id
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
    @Id
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private Integer quantity;
}
