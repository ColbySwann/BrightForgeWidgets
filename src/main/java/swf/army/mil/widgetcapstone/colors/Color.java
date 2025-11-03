package swf.army.mil.widgetcapstone.colors;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import swf.army.mil.widgetcapstone.product.Product;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    @OneToMany(mappedBy = "color", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("color")
    private List<Product> products = new ArrayList<>();

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
