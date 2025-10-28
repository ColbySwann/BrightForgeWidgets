package swf.army.mil.widgetcapstone.colors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/color")
public class ColorController {

    private final ColorService colorService;


    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }

    @PostMapping
    public ResponseEntity<Color> createColor(@RequestBody Color color) {
        return ResponseEntity.ok(colorService.createColor(color));
    }

    @GetMapping
    public List<Color> getAllColor() {
        return colorService.getAllColor();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Color> getColorById(@PathVariable Long id) {
        return colorService.getColorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Color> updateColor(@PathVariable Long id, @RequestBody Color color) {
        return colorService.updateColor(id, color)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColor(@PathVariable Long id) {
        boolean deleted = colorService.deleteColor(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }





}
