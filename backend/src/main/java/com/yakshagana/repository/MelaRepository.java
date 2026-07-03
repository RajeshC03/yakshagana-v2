package com.yakshagana.repository;
import com.yakshagana.model.Mela; import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; import java.util.List; import java.util.Optional;
@Repository public interface MelaRepository extends JpaRepository<Mela,Long> {
    List<Mela> findByStyle(String s); List<Mela> findByRegion(String r);
    List<Mela> findByIsFamous(boolean famous);
    Optional<Mela> findByNameIgnoreCase(String name);
}
