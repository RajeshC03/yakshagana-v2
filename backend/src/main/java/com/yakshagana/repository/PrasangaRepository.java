package com.yakshagana.repository;
import com.yakshagana.model.Prasanga; import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; import java.util.List;
@Repository public interface PrasangaRepository extends JpaRepository<Prasanga,Long> {
    List<Prasanga> findByIsFamous(boolean isFamous);
}
