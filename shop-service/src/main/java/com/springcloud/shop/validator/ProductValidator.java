package com.springcloud.shop.validator;

import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.dto.ProductDTO;
import com.springcloud.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ProductValidator implements Validator {

    @Autowired
    private ProductService productService;

    @Override
    public boolean supports(Class<?> clazz) {
        return ProductDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductDTO productDTO = (ProductDTO) target;
        Product product = null;

        // verify sku
        if (productDTO.getSku() == null || productDTO.getSku().equalsIgnoreCase("") || productDTO.getSku().isEmpty()) {
            errors.rejectValue("sku", "product.sku.blank", "product.sku.blank");
        } else {
            product = productService.findBySku(productDTO.getSku());
            if (product != null && product.getId() != productDTO.getId()) {
                errors.rejectValue("sku", "product.sku.exist", "product.sku.exist");
            }
        }

        // verify name
        if (productDTO.getName() == null || productDTO.getName().equalsIgnoreCase("") || productDTO.getName().isEmpty()) {
            errors.rejectValue("name", "product.name.blank", "product.name.blank");
        }

        // verify category
        if (productDTO.getCategoryId() == 0) {
            errors.rejectValue("category", "product.category.blank", "product.category.blank");
        }

        // verify brand
        if (productDTO.getBrandId() == 0) {
            errors.rejectValue("brand", "product.brand.blank", "product.brand.blank");
        }

    }

}
