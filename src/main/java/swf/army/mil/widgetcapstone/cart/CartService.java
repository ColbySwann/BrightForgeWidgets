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

@Service
@RequiredArgsConstructor
@Transactional
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


    @Transactional
    public Cart addItem(Long userId, Long productId, Long colorId, int qty) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Color color = colorRepository.findById(colorId)
                .orElseThrow(() -> new RuntimeException("Color not found"));

        if (product.getQty() <= 0) {
            throw new RuntimeException("Item Out of Stock");
        }else if (product.getLifecycleStatus().getStatusCode().equals("oos_permanent")) {
            throw  new RuntimeException("Item Out of Stock Permanently");
        }

        CartItem item = cart.getItems().stream()
                        .filter(i -> i.getProduct().equals(product) && i.getColor().equals(color))
                                .findFirst()
                                .orElseGet(() -> {
                                        CartItem newItem = new CartItem();
                                        newItem.setCart(cart);
                                        newItem.setProduct(product);
                                        newItem.setColor(color);
                                        newItem.setQuantity(0);
                                        newItem.setUnitPrice(product.getPrice());
                                        cart.getItems().add(newItem);
                                        return newItem;
                                        });
        item.setQuantity(item.getQuantity() + qty);

        product.setQty(product.getQty() -qty);
        productRepository.save(product);


        return cartRepository.save(cart);
    }

    @Transactional
    public void removeItem(Long userId, Long cartItemId) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem= cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart Item not found"));

        Long productId = cartItem.getProduct().getId();
        Product product = productRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException("Product not found"));

        int restoredQty = product.getQty() + cartItem.getQuantity();
        product.setQty(restoredQty);

        productRepository.saveAndFlush(product);

        cart.getItems().remove(cartItem);
        cartItemRepository.deleteById(cartItemId);

        cartRepository.save(cart);
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

        Product product = item.getProduct();

        int currentQtyInCart = item.getQuantity();
        int availStock = product.getQty();

        int delta = quantity - currentQtyInCart;

        if (delta > 0) {
            if (availStock < delta) {
                throw new RuntimeException("Not enough stock available");
            }

            product.setQty(availStock - delta);
        }else if (delta < 0) {
            product.setQty(availStock + Math.abs(delta));
        }

        if (quantity <= 0) {
            removeItem(userId, cartItemId);
        }else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }
        productRepository.save(product);
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
