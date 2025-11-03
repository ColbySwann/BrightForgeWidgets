package swf.army.mil.widgetcapstone.DTO;

import lombok.Data;

@Data
public class CartItemRequest {
    private Long productId;
    private Long colorId;
    private int quantity;
}
