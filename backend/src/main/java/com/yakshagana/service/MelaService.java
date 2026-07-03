package com.yakshagana.service;
import com.yakshagana.model.Mela; import com.yakshagana.repository.MelaRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.*;
@Service public class MelaService {
    @Autowired private MelaRepository r;
    public List<Mela> getAllMelas()             { return r.findAll(); }
    public Optional<Mela> getMelaById(Long id) { return r.findById(id); }
    public List<Mela> getByStyle(String s)     { return r.findByStyle(s); }
    public List<Mela> getByRegion(String g)    { return r.findByRegion(g); }
    public List<Mela> getFamousMelas()         { return r.findByIsFamous(true); }
    public Mela saveMela(Mela m)               { return r.save(m); }
    public void deleteMela(Long id)            { r.deleteById(id); }
}
