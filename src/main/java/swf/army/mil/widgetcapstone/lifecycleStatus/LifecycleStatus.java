package swf.army.mil.widgetcapstone.lifecycleStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lifecycle_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LifecycleStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lifecycleStatusId;

    private String statusCode;
    private String description;

    @Override
    public String toString() {
        return "LifecycleStatus{" +
                "lifecycleStatusId=" + lifecycleStatusId +
                ", statusCode='" + statusCode + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
