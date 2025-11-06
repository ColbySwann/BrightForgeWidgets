package swf.army.mil.widgetcapstone.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Product updateProduct(Long id, Product updated) {
         Product optionalProduct = productRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Product Not Found"));

             optionalProduct.setName(updated.getName());
             if (optionalProduct.getSlug() == null || optionalProduct.getSlug().isBlank()) {
                 String slug = generateSlug(optionalProduct.getName());
                 optionalProduct.setSlug(slug);
             }
             optionalProduct.setBlurb(updated.getBlurb());
             optionalProduct.setColor(updated.getColor());
             optionalProduct.setImageUrl(updated.getImageUrl());
             optionalProduct.setUsefulnessRating(updated.getUsefulnessRating());
             optionalProduct.setQty(updated.getQty());
             optionalProduct.setLifecycleStatus(updated.getLifecycleStatus());
             optionalProduct.setUpdatedAt(LocalDateTime.now());
             return productRepository.save(optionalProduct);


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
