package com.yakshagana.repository;
import com.yakshagana.model.User; import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; import java.util.Optional;
@Repository public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String e); boolean existsByEmail(String e);
}
