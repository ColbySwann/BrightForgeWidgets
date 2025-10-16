package swf.army.mil.widgetcapstone.colors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colors")
public class ColorsController {

    private final ColorsService colorsService;


    public ColorsController(ColorsService colorsService) {
        this.colorsService = colorsService;
    }

    @PostMapping
    public ResponseEntity<Color> createColors(@RequestBody Color color) {
        return ResponseEntity.ok(colorsService.createColors(color));
    }

    @GetMapping
    public List<Color> getAllColors() {
        return colorsService.getAllColors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Color> getColorsById(@PathVariable Long id) {
        return colorsService.getColorsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Color> updateColors(@PathVariable Long id, @RequestBody Color color) {
        return colorsService.updateColors(id, color)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColors(@PathVariable Long id) {
        boolean deleted = colorsService.deleteColors(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }





}
