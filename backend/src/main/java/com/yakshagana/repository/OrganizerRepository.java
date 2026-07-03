package com.yakshagana.repository;
import com.yakshagana.model.Organizer; import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; import java.util.Optional;
@Repository public interface OrganizerRepository extends JpaRepository<Organizer,Long> {
    Optional<Organizer> findByEmail(String e); boolean existsByEmail(String e);
}
