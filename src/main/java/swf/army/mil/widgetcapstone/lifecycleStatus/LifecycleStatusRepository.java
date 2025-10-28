package swf.army.mil.widgetcapstone.lifecycleStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LifecycleStatusRepository extends JpaRepository<LifecycleStatus, Long> {
}
