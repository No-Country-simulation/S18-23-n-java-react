package com.nocountry.rentify.model.entity;

import com.nocountry.rentify.model.enums.Antiquity;
import com.nocountry.rentify.model.enums.PropertyType;
import com.nocountry.rentify.model.enums.Status;
import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private User owner;

    //@OneToMany(mappedBy="property")
    //private Set<PropertyMultimedia> propertyMultimedias;

    private String country;

    private String province;

    private String city;

    @Column(name = "street_name", nullable = false)
    private String streetName;

    @Column(name = "street_number", nullable = false)
    private String streetNumber;

    private int numberOfRooms;

    @Enumerated(EnumType.STRING)
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    private Antiquity antiquity;

    @Column(name = "years_of_antiquity")
    private int yearsOfAntiquity;

    private BigDecimal price;

    @Column(name = "maintenance_fees")
    private BigDecimal maintenanceFees;

    private String title;

    private String description;

    @Column(name = "total_area")
    private BigDecimal totalArea;

    @Column(name = "built_area")
    private BigDecimal builtArea;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "property_amenity", joinColumns = @JoinColumn(name = "property_id"), inverseJoinColumns = @JoinColumn(name = "amenity_id"))
    private Set<Amenity> amenities;

    //@ManyToMany(fetch = FetchType.LAZY)
    //@JoinTable(name = "property_feature", joinColumns = @JoinColumn(name = "property_id"), inverseJoinColumns = @JoinColumn(name = "feature_id"))
    //private Set<Feature> features;

    @OneToMany(mappedBy = "property", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<PropertyRoom> rooms = new ArrayList<>();
}
