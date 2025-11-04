package swf.army.mil.widgetcapstone.product;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.parameters.P;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import swf.army.mil.widgetcapstone.user.JwtUtil;

import java.awt.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ProductControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private JwtUtil jwtUtil;

    @MockitoBean
    ProductService productService;


    @Test
    void shouldAcceptGetRequest() throws Exception {
        mvc.perform(get("/api/products")).andExpect(status().isOk());
    }

    @Test
    void shouldReturnListOfProducts() throws Exception {
        List<Product> testListOfProducts = List.of(new Product(1L, "product1"),new Product (2L, "product2"));
        when(productService.getAllProducts()).thenReturn(testListOfProducts);
        mvc.perform(get("/api/products")).andExpect(content().json(mapper.writeValueAsString(testListOfProducts)));
    }

    @Nested
    class addProduct {
        @Test
        void shouldAcceptPostRequest() throws Exception {
            Product testProduct = new Product(1L, "test 1");
            mvc.perform(post("/api/products")
                            .contentType(APPLICATION_JSON)
                            .content(mapper.writeValueAsString(testProduct)))
                    .andExpect(status().is2xxSuccessful());
        }

        @Test
        void shouldCallProductServiceWithNewTodo() throws Exception {
            Product testProduct = new Product(1L, "test 1");
            mvc.perform(post("/api/products")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testProduct)));

            verify(productService, times(1)).createProduct(testProduct);
        }

        @Test
        void shouldReturnCreatedTodoFromTodoService() throws Exception {
            Product newTestProduct = new Product(1L, "test 1");
            Product createdTestProduct = new Product(1L, "test 1");
            when(productService.createProduct(newTestProduct)).thenReturn(createdTestProduct);

            mvc.perform(post("/api/products")
                            .contentType(APPLICATION_JSON)
                            .content(mapper.writeValueAsString(newTestProduct)))
                    .andExpect(content().json(mapper.writeValueAsString(createdTestProduct)));

        }
    }

    @Nested
    class editProduct {
        @Test
        void shouldAcceptPutRequest() throws Exception {
            Product testProduct = new Product(23L, "test 1");
            when(productService.updateProduct(eq(23L), any(Product.class)))
                    .thenReturn(Optional.of(testProduct));
            mvc.perform(put("/api/products/" + testProduct.getId())
                            .contentType(APPLICATION_JSON)
                            .content(mapper.writeValueAsString(testProduct)))
                    .andExpect(status().isOk());
        }

        @Test
        void shouldCallProductService() throws Exception {
            Product testProduct = new Product(23L, "test 1");
            mvc.perform(put("/api/products/" + testProduct.getId())
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testProduct)));
            verify(productService, times(1)).updateProduct(testProduct.getId(), testProduct);
        }

        @Test
        void shouldReturnNotFoundWhenServiceThrowsANotFoundException() throws Exception {
            Product testProduct = new Product(23L, "test 1");
            when(productService.updateProduct(eq(99L), any(Product.class)))
                    .thenThrow(new NoSuchElementException("Product Not Found"));
            mvc.perform(put("/api/products/" + testProduct.getId())
                            .contentType(APPLICATION_JSON)
                            .content(mapper.writeValueAsString(testProduct)))
                    .andExpect(status().isNotFound());
        }
    }


}
