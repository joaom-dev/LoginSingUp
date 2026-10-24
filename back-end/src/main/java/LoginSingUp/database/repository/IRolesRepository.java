package LoginSingUp.database.repository;

import LoginSingUp.database.entity.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRolesRepository extends JpaRepository<RolesEntity, Integer> {

    Optional<RolesEntity> findByName(String name);
}