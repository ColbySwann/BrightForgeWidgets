package swf.army.mil.widgetcapstone.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swf.army.mil.widgetcapstone.DTO.CartItemRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<Cart> addItem(@PathVariable Long userId, @RequestBody CartItemRequest request) {
        Cart cart = cartService.addItem(userId, request.getProductId(), request.getColorId(), request.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{userId}/remove/{cartItemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long userId, @PathVariable Long cartItemId) {
        cartService.removeItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/update/{cartItemId}")
    public ResponseEntity<Cart> updateCartItemQuantity(
            @PathVariable Long userId,
            @PathVariable Long cartItemId,
            @RequestBody Map<String, Integer> request
    ){
        Object qtyObj = request.get("quantity");
        if (qtyObj == null) {
            return ResponseEntity.badRequest().body(null);
        }

        int quantity;
        try {
            quantity = Integer.parseInt(qtyObj.toString());
        }catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }

        Cart updatedCart = cartService.updateItemQuantity(userId, cartItemId, quantity);
        return ResponseEntity.ok(updatedCart);
    }
}
