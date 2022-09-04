package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductAttribute;
import com.springcloud.shop.model.entity.ProductImage;
import com.springcloud.shop.repository.ProductAttributeRepository;
import com.springcloud.shop.service.ProductAttributeService;
import com.springcloud.shop.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductAttributeServiceImpl implements ProductAttributeService {

    @Autowired
    private ProductAttributeRepository productAttributeRepository;

    @Override
    public List<ProductAttribute> findAll() {
        return productAttributeRepository.findAll();
    }


    @Override
    public ProductAttribute findById(long id) {
        Optional<ProductAttribute> optional = productAttributeRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public ProductAttribute save(ProductAttribute object) {
        return productAttributeRepository.save(object);
    }

    @Override
    public List<ProductAttribute> findAllByProductAndActive(Product productId) {
        return productAttributeRepository.findAllByProductAndStatus(productId, true);
    }

}
