package swf.army.mil.widgetcapstone.colors;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorService {
    
    public final ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    public Color createColor(Color color) {
        return colorRepository.save(color);
    }

    public List<Color> getAllColor() {
        return colorRepository.findAll();
    }

    public Optional<Color> getColorById(Long id) {
        return colorRepository.findById(id);
    }

    public Optional<Color> updateColor(Long id, Color updated) {
        return colorRepository.findById(id).map(existing -> {
            existing.setColorCode(updated.getColorCode());
            existing.setColorLabel(updated.getColorLabel());
            existing.setColorHex(updated.getColorHex());
            return colorRepository.save(existing);
        });
    }

    public boolean deleteColor(Long id) {
        if (colorRepository.existsById(id)) {
            colorRepository.deleteById(id);
            return true;
        }
        return false;


    }
    
}
