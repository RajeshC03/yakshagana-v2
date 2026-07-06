package com.yakshagana.controller;
import com.yakshagana.model.Show; import com.yakshagana.service.ShowService;
import com.yakshagana.repository.MelaRepository;
import com.yakshagana.websocket.ShowBroadcastService;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/shows") @CrossOrigin(origins="*")
public class ShowController {
    @Autowired private ShowService s;
    @Autowired private MelaRepository melaRepo;
    @Autowired private ShowBroadcastService broadcaster;
    @GetMapping public List<Show> all(
            @RequestParam(required=false) String district,
            @RequestParam(required=false) String style,
            @RequestParam(required=false) String melaName) {
        if(district!=null) return s.getShowsByDistrict(district);
        if(style!=null) return s.getShowsByStyle(style);
        if(melaName!=null) return s.getShowsByMelaName(melaName);
        return s.getAllShows();
    }
    @GetMapping("/tonight")  public List<Show> tonight()  { return s.getTonightShows(); }
    @GetMapping("/upcoming") public List<Show> upcoming() { return s.getUpcomingShows(); }
    @GetMapping("/{id}") public ResponseEntity<Show> one(@PathVariable Long id) {
        return s.getShowById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping public Show create(@RequestBody Show show) {
        linkMela(show); // ✅ FIX: attach the matching Mela FK based on melaName text
        Show saved = s.saveShow(show);
        // broadcaster.sendUpdate("🎭 New show added: " + saved.getPrasanga() + " by " + saved.getMelaName() + " at " + saved.getVenue());
        broadcaster.sendUpdate(
    "🎭 New show added: " + saved.getPrasanga() +
    " by " + saved.getMelaName() +
    " at " + saved.getVenue(),

    "🎭 ಹೊಸ ಪ್ರದರ್ಶನ ಸೇರಿಸಲಾಗಿದೆ: " +
    saved.getPrasangaKn() +
    " - " +
    saved.getMelaNameKn() +
    " - " +
    saved.getVenueKn()
);
        return saved;
    }

    @PutMapping("/{id}") public ResponseEntity<Show> update(@PathVariable Long id, @RequestBody Show show) {
        return s.getShowById(id).map(e -> {
            show.setId(id);
            linkMela(show); // ✅ FIX: keep FK in sync if mela name changes on edit
            Show updated = s.saveShow(show);
            // broadcaster.sendUpdate("📝 Show updated: " + updated.getPrasanga() + " by " + updated.getMelaName());
            broadcaster.sendUpdate(
    "📝 Show updated: " + updated.getPrasanga() +
    " by " + updated.getMelaName(),

    "📝 ಪ್ರದರ್ಶನವನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ: " +
    updated.getPrasangaKn() +
    " - " +
    updated.getMelaNameKn()
);
            
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) {
        s.getShowById(id).ifPresent(show -> broadcaster.sendUpdate(
    "🗑️ Show cancelled: " +
    show.getPrasanga() +
    " by " +
    show.getMelaName(),

    "🗑️ ಪ್ರದರ್ಶನ ರದ್ದಾಗಿದೆ: " +
    show.getPrasangaKn() +
    " - " +
    show.getMelaNameKn()
));
        s.deleteShow(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Looks up the Mela by name (case-insensitive) and attaches it to the show
    // so the mela_id foreign key is always populated, not just the melaName text.
    private void linkMela(Show show) {
        if (show.getMelaName() == null) return;
        melaRepo.findByNameIgnoreCase(show.getMelaName().trim())
                .ifPresent(show::setMela);
    }
}
