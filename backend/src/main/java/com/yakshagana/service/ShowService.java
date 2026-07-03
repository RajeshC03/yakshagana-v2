package com.yakshagana.service;
import com.yakshagana.model.Show; import com.yakshagana.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.time.LocalDate; import java.util.*; 
@Service public class ShowService {
    @Autowired private ShowRepository r;
    public List<Show> getAllShows()                { return r.findAll(); }
    public List<Show> getTonightShows()            { return r.findTonightShows(LocalDate.now()); }
    public List<Show> getUpcomingShows()           { return r.findByDateGreaterThanEqual(LocalDate.now()); }
    public Optional<Show> getShowById(Long id)     { return r.findById(id); }
    public List<Show> getShowsByMela(Long id)      { return r.findByMelaId(id); }
    public List<Show> getShowsByMelaName(String n) { return r.findByMelaName(n); }
    public List<Show> getShowsByMelaNameIgnoreCase(String n) { return r.findByMelaNameIgnoreCase(n); }
    public List<Show> getShowsByDistrict(String d) { return r.findByDistrict(d); }
    public List<Show> getShowsByStyle(String s)    { return r.findByStyle(s); }
    public Show saveShow(Show s)                   { return r.save(s); }
    public void deleteShow(Long id)                { r.deleteById(id); }
    public boolean existsById(Long id)             { return r.existsById(id); }
}
