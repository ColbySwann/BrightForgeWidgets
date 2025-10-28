package swf.army.mil.widgetcapstone.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swf.army.mil.widgetcapstone.product.Product;
import swf.army.mil.widgetcapstone.product.ProductRepository;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    public final ProductRepository productRepository;

    public Product createProduct(Product product) {
        if (product.getSlug() == null || product.getSlug().isBlank()) {
            String slug = generateSlug(product.getName());
            product.setSlug(slug);
        }


        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> updateProduct(Long id, Product updated) {
         Optional<Product> optionalProduct = productRepository.findById(id);

         if (optionalProduct.isPresent()) {
             Product existingProduct = optionalProduct.get();
             existingProduct.setName(updated.getName());
             existingProduct.setSlug(updated.getSlug());
             existingProduct.setBlurb(updated.getBlurb());
             existingProduct.setColor(updated.getColor());
             existingProduct.setImageUrl(updated.getImageUrl());
             existingProduct.setUsefulnessRating(updated.getUsefulnessRating());
             existingProduct.setQty(updated.getQty());
             existingProduct.setLifecycleStatus(updated.getLifecycleStatus());
             existingProduct.setUpdatedAt(LocalDateTime.now());
             return Optional.of(productRepository.save(existingProduct));
         }else{
             throw new RuntimeException("Product not found with id: " + id);
         }
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public String generateSlug(String name) {
        String normalized = Normalizer.normalize(name, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "");
        String baseSlug = normalized.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");

        String uniqueSlug = baseSlug;
        int counter = 1;

        while (productRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = baseSlug + "-" + counter++;
        }
        return uniqueSlug;
    }




}
