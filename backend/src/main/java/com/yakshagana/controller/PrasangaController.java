package com.yakshagana.controller;
import com.yakshagana.model.Prasanga; import com.yakshagana.repository.PrasangaRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/prasangas") @CrossOrigin(origins="*")
public class PrasangaController {
    @Autowired private PrasangaRepository r;
    @GetMapping public List<Prasanga> all(@RequestParam(required=false) Boolean famous) {
        if (famous != null && famous) return r.findByIsFamous(true);
        return r.findAll();
    }
    @PostMapping public Prasanga create(@RequestBody Prasanga p) { return r.save(p); }
    @PutMapping("/{id}") public ResponseEntity<Prasanga> update(@PathVariable Long id, @RequestBody Prasanga p) {
        return r.findById(id).map(e -> { p.setId(id); return ResponseEntity.ok(r.save(p)); }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { r.deleteById(id); return ResponseEntity.noContent().build(); }
}
