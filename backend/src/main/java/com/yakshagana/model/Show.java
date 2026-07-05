package com.yakshagana.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import lombok.Builder;


@Builder
@Entity
@Table(name = "shows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== English =====
    private String prasanga;
    private String melaName;
    private String troupeNo;
    private String venue;
    private String district;
    private String style;
    private String epic;

    // ===== Kannada =====
    private String prasangaKn;
    private String melaNameKn;
    private String venueKn;
    private String districtKn;
    private String styleKn;
    private String epicKn;

    private LocalDate date;

    private String startTime;
    private String endTime;

    @JsonProperty("isTonight")
    private boolean isTonight;

    @JsonProperty("isFeatured")
    private boolean isFeatured;

    private String ticketPrice;

    private Double latitude;
    private Double longitude;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mela_id")
    private Mela mela;
}