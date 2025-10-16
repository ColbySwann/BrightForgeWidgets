package swf.army.mil.widgetcapstone.colors;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorsService {
    
    public final ColorsRepository colorsRepository;

    public ColorsService(ColorsRepository colorsRepository) {
        this.colorsRepository = colorsRepository;
    }

    public Color createColors(Color color) {
        return colorsRepository.save(color);
    }

    public List<Color> getAllColors() {
        return colorsRepository.findAll();
    }

    public Optional<Color> getColorsById(Long id) {
        return colorsRepository.findById(id);
    }

    public Optional<Color> updateColors(Long id, Color updated) {
        return colorsRepository.findById(id).map(existing -> {
            existing.setColorCode(updated.getColorCode());
            existing.setColorLabel(updated.getColorLabel());
            existing.setColorHex(updated.getColorHex());
            return colorsRepository.save(existing);
        });
    }

    public boolean deleteColors(Long id) {
        if (colorsRepository.existsById(id)) {
            colorsRepository.deleteById(id);
            return true;
        }
        return false;


    }
    
}
