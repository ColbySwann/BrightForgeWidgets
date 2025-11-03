package swf.army.mil.widgetcapstone.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swf.army.mil.widgetcapstone.DTO.CartDto;
import swf.army.mil.widgetcapstone.DTO.CartItemDto;
import swf.army.mil.widgetcapstone.colors.Color;
import swf.army.mil.widgetcapstone.colors.ColorRepository;
import swf.army.mil.widgetcapstone.product.Product;
import swf.army.mil.widgetcapstone.product.ProductRepository;
import swf.army.mil.widgetcapstone.user.UserRepository;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;


    public Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found")));
                    return cartRepository.save(newCart);
                });
    }

    public Cart addItem(Long userId, Long productId, Long colorId, int qty) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Color color = colorRepository.findById(colorId)
                .orElseThrow(() -> new RuntimeException("Color not found"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getProduct().equals(product) && i.getColor().equals(color))
                .findFirst();


        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + qty);
        }else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setColor(color);
            item.setQuantity(qty);
            item.setUnitPrice(product.getPrice());
            cart.getItems().add(item);
        }
        return cartRepository.save(cart);
    }

    public void removeItem(Long userId, Long cartItemId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteById(cartItemId);
    }

    public Cart getCart(Long userId) {
        return getOrCreateCart(userId);
    }

    @Transactional
    public Cart updateItemQuantity(Long userId, Long cartItemId, int quantity) {
        Cart cart = getOrCreateCart(userId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        if (quantity <= 0) {
            cartItemRepository.delete(item);
            cart.getItems().remove(item);
        }else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return cartRepository.save(cart);
    }

    @Transactional(readOnly = true)
    public CartDto getCartForUser(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItemDto> items = cart.getItems().stream()
                .map(i ->{
                    Product product = i.getProduct();
                    Color color = product.getColor();
                    return new CartItemDto(
                            i.getCartItemId(),
                            product.getName(),
                            color != null ? color.getColorLabel() : null,
                            i.getQuantity(),
                            product.getPrice().doubleValue()
                    );
                })
                .toList();

        return new CartDto(cart.getCartId(), items);
    }
}
