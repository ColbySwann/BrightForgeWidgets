package swf.army.mil.widgetcapstone.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import swf.army.mil.widgetcapstone.colors.Color;
import swf.army.mil.widgetcapstone.lifecycleStatus.LifecycleStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    @JsonIgnoreProperties({"product"})
    private Color color;

    private String imageUrl;
    private double usefulnessRating = 1.0;
    private int qty;

    @Column(nullable = false)
    private BigDecimal price = BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "lifecycle_status")
    private LifecycleStatus lifecycleStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Product(Long id, String name) {
        this.id = id;
        this.name = name;
    }


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
