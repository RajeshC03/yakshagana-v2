package com.yakshagana.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDate;

@Entity @Table(name="shows") @Data @NoArgsConstructor @AllArgsConstructor
public class Show {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String prasanga, melaName, troupeNo, venue, district;
    private LocalDate date;
    private String startTime, endTime, style, epic;

    // ✅ FIX: @JsonProperty forces Jackson to always use "isFeatured"
    // and "isTonight" in JSON, regardless of Lombok getter naming rules.
    @JsonProperty("isTonight")  private boolean isTonight;
    @JsonProperty("isFeatured") private boolean isFeatured;

    private String ticketPrice;
    private Double latitude, longitude;
    @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="mela_id") private Mela mela;
}
