package swf.army.mil.widgetcapstone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {

    private Long id;
    private String productName;
    private String color;
    private Integer quantity;
    private Double price;
}
