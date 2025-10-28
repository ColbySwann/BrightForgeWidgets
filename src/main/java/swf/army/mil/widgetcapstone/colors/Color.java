package swf.army.mil.widgetcapstone.colors;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "color")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long colorId;
    private String colorCode;
    private String colorLabel;
    private String colorHex;

    @Override
    public String toString() {
        return "Colors{" +
                "colorId=" + colorId +
                ", colorCode='" + colorCode + '\'' +
                ", colorLabel='" + colorLabel + '\'' +
                ", colorHex='" + colorHex + '\'' +
                '}';
    }
}
