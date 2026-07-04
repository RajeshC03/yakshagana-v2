package com.yakshagana.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "melas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mela {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Information
    private String name;
    private String kannadaName;
    private String fullName;

    // Region
    private String region;
    private String regionKn;

    // Location
    private String location;
    private String locationKn;

    // Style
    private String style;
    private String styleKn;

    private int troupeCount;

    // Founded Year
    private String foundedYear;
    private String foundedYearKn;

    // Deity
    private String deity;
    private String deityKn;

    // Description
    @Column(length = 1500)
    private String description;

    @Column(length = 1500)
    private String descriptionKn;

    private int showsThisSeason;

    private String colorHex;

    private boolean isFamous = false;

    // Famous Artists (English)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "mela_artists",
        joinColumns = @JoinColumn(name = "mela_id")
    )
    @Column(name = "artist_name")
    private List<String> famousArtists;

    // Famous Artists (Kannada)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "mela_artists_kn",
        joinColumns = @JoinColumn(name = "mela_id")
    )
    @Column(name = "artist_name_kn")
    private List<String> famousArtistsKn;

    // Popular Prasangas (English)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "mela_prasangas",
        joinColumns = @JoinColumn(name = "mela_id")
    )
    @Column(name = "prasanga_name")
    private List<String> popularPrasangas;

    // Popular Prasangas (Kannada)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "mela_prasangas_kn",
        joinColumns = @JoinColumn(name = "mela_id")
    )
    @Column(name = "prasanga_name_kn")
    private List<String> popularPrasangasKn;
}