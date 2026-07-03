package com.yakshagana.model;
import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="organizers") @Data @NoArgsConstructor @AllArgsConstructor
public class Organizer {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String name;
    @Column(nullable=false) private String melaName;
    @Column(nullable=false,unique=true) private String email;
    @Column(nullable=false) private String password;
    private String phone, region;
    private String role = "ORGANIZER";
}
