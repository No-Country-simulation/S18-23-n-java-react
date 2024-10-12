package com.nocountry.rentify.model.entity;

import com.nocountry.rentify.model.enums.PropertyMultimediaType;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "properties_multimedia")
public class PropertyMultimedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyMultimediaType type;

    @Column(nullable = false)
    private String url;
}