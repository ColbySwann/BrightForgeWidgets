package swf.army.mil.widgetcapstone.product;

import jakarta.persistence.*;
import lombok.*;
import swf.army.mil.widgetcapstone.colors.Color;
import swf.army.mil.widgetcapstone.lifecycleStatus.LifecycleStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String slug;
    private String blurb;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color color;

    private String imageUrl;
    private double usefulnessRating = 1.0;
    private int qty;

    @ManyToOne
    @JoinColumn(name = "lifecycle_status")
    private LifecycleStatus lifecycleStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", slug='" + slug + '\'' +
                ", blurb='" + blurb + '\'' +
                ", colors=" + color +
                ", imageUrl='" + imageUrl + '\'' +
                ", usefulnessRating=" + usefulnessRating +
                ", qty=" + qty +
                ", lifecycleStatus='" + lifecycleStatus + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
