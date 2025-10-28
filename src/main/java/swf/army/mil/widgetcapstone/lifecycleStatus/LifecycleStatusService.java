package swf.army.mil.widgetcapstone.lifecycleStatus;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LifecycleStatusService {
    
    private final LifecycleStatusRepository lifecycleStatusRepository;


    public LifecycleStatusService(LifecycleStatusRepository lifecycleStatusRepository) {
        this.lifecycleStatusRepository = lifecycleStatusRepository;
    }

    public LifecycleStatus createLifecycleStatus(LifecycleStatus color) {
        return lifecycleStatusRepository.save(color);
    }

    public List<LifecycleStatus> getAllLifecycleStatus() {
        return lifecycleStatusRepository.findAll();
    }

    public Optional<LifecycleStatus> getLifecycleStatusById(Long id) {
        return lifecycleStatusRepository.findById(id);
    }

    public Optional<LifecycleStatus> updateLifecycleStatus(Long id, LifecycleStatus updated) {
        return lifecycleStatusRepository.findById(id).map(existing -> {
            existing.setStatusCode(updated.getStatusCode());
            existing.setDescription(updated.getDescription());
            return lifecycleStatusRepository.save(existing);
        });
    }

    public boolean deleteLifecycleStatus(Long id) {
        if (lifecycleStatusRepository.existsById(id)) {
            lifecycleStatusRepository.deleteById(id);
            return true;
        }
        return false;


    }

}
