package com.yakshagana.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="organizers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organizer {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    // Kannada organizer name
    private String nameKn;

    @Column(nullable=false)
    private String melaName;

    // Kannada mela name
    private String melaNameKn;

    @Column(nullable=false,unique=true)
    private String email;

    @Column(nullable=false)
    private String password;

    private String phone;

    private String region;

    // Kannada region
    private String regionKn;

    private String role = "ORGANIZER";
}