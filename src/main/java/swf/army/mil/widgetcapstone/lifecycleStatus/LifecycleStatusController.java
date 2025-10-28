package swf.army.mil.widgetcapstone.lifecycleStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lifecycleStatus")
public class LifecycleStatusController {

    private final LifecycleStatusService lifecycleStatusService;


    public LifecycleStatusController(LifecycleStatusService lifecycleStatusService) {
        this.lifecycleStatusService = lifecycleStatusService;
    }

    @PostMapping
    public ResponseEntity<LifecycleStatus> createLifecycleStatus(@RequestBody LifecycleStatus lifecycleStatus) {
        return ResponseEntity.ok(lifecycleStatusService.createLifecycleStatus(lifecycleStatus));
    }

    @GetMapping
    public List<LifecycleStatus> getAllLifecycleStatus() {
        return lifecycleStatusService.getAllLifecycleStatus();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LifecycleStatus> getLifecycleStatusById(@PathVariable Long id) {
        return lifecycleStatusService.getLifecycleStatusById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LifecycleStatus> updateLifecycleStatus(@PathVariable Long id, @RequestBody LifecycleStatus lifecycleStatus) {
        return lifecycleStatusService.updateLifecycleStatus(id, lifecycleStatus)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLifecycleStatus(@PathVariable Long id) {
        boolean deleted = lifecycleStatusService.deleteLifecycleStatus(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }





}
