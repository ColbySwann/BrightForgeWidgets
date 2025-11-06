package swf.army.mil.widgetcapstone.product;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {


    @Mock
    ProductRepository productRepository;

    @InjectMocks
    ProductService productService;

    @Test
    void shouldCallRepositoryToGetAllProducts() {
        List<Product> testListOfProducts = List.of(new Product(1L, "Product 1"), new Product(1L, "Product 2"));
        when(productRepository.findAll()).thenReturn(testListOfProducts);
        List<Product> resultList = productService.getAllProducts();
        assertEquals(resultList, testListOfProducts);
    }

    @Test
    void deleteProductById_ShouldReturnNotContent() {
        Long productId = 1L;
        when(productRepository.existsById(productId)).thenReturn(true);
        productService.deleteProduct(productId);
        verify(productRepository, times(1)).deleteById(productId);
    }

    @Test
    void shouldUpdateProductThatExists() {
        Long productId = 1L;
        Product existingProduct = new Product(productId, "OldName");
        Product updatedProduct = new Product(productId, "NewName");

        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product result = productService.updateProduct(productId, updatedProduct);

        assertEquals("NewName", result.getName());
    }



}
