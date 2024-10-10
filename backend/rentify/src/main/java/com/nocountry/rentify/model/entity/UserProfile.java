package com.nocountry.rentify.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_profiles")
public class UserProfile {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(length = 50)
        String name;

        @Column(length = 50)
        String lastName;

        @Column(length = 50)
        String phone;

        String photo;

        @OneToOne
        @JoinColumn(name = "user_id", referencedColumnName = "id")
        private User user;


}