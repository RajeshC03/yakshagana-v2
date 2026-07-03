package com.yakshagana.model;
import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="prasangas") @Data @NoArgsConstructor @AllArgsConstructor
public class Prasanga {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String name, epic;
    private String nameKn;
    @Column(length=1000) private String description;
    @Column(length=1000) private String descriptionKn;
    private boolean isFamous = false;
}
