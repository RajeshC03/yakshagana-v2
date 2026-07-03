package com.yakshagana.repository;
import com.yakshagana.model.Show; import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository; import java.time.LocalDate; import java.util.List;
@Repository public interface ShowRepository extends JpaRepository<Show,Long> {
    @Query("SELECT s FROM Show s WHERE s.isTonight = true AND s.date = :today")
    List<Show> findTonightShows(LocalDate today);
    List<Show> findByIsTonight(boolean t);
    List<Show> findByDateGreaterThanEqual(LocalDate d);
    List<Show> findByMelaId(Long id);
    List<Show> findByDistrict(String d);
    List<Show> findByStyle(String s);
    List<Show> findByMelaName(String n);
    List<Show> findByMelaNameIgnoreCase(String n);
}
