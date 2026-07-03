package com.yakshagana.controller;
import com.yakshagana.model.*; import com.yakshagana.service.*;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/melas") @CrossOrigin(origins="*")
public class MelaController {
    @Autowired private MelaService ms; @Autowired private ShowService ss;
    @GetMapping public List<Mela> all(
            @RequestParam(required=false) String style,
            @RequestParam(required=false) String region,
            @RequestParam(required=false) Boolean famous) {
        if (famous != null && famous) return ms.getFamousMelas();
        if (style  != null) return ms.getByStyle(style);
        if (region != null) return ms.getByRegion(region);
        return ms.getAllMelas();
    }
    @GetMapping("/{id}") public ResponseEntity<Mela> one(@PathVariable Long id) {
        return ms.getMelaById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/{id}/shows") public List<Show> shows(@PathVariable Long id) {
        return ms.getMelaById(id).map(mela -> {
            // ✅ FIX: merge shows linked by FK (seeded data) with shows matched by
            // mela name (organiser-added shows, which only store the name as text)
            java.util.LinkedHashMap<Long, Show> merged = new java.util.LinkedHashMap<>();
            for (Show s : ss.getShowsByMela(id)) merged.put(s.getId(), s);
            for (Show s : ss.getShowsByMelaNameIgnoreCase(mela.getName())) merged.put(s.getId(), s);
            List<Show> result = new java.util.ArrayList<>(merged.values());
            return result;
        }).orElse(java.util.Collections.emptyList());
    }
    @PostMapping public Mela create(@RequestBody Mela m) { return ms.saveMela(m); }
    @PutMapping("/{id}") public ResponseEntity<Mela> update(@PathVariable Long id, @RequestBody Mela m) {
        return ms.getMelaById(id).map(e -> { m.setId(id); return ResponseEntity.ok(ms.saveMela(m)); }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { ms.deleteMela(id); return ResponseEntity.noContent().build(); }
}
