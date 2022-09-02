package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductImage;
import com.springcloud.shop.repository.ProductImageRepository;
import com.springcloud.shop.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    @Override
    public List<ProductImage> findAll() {
        return productImageRepository.findAll();
    }


    @Override
    public ProductImage findById(long id) {
        Optional<ProductImage> optional = productImageRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public ProductImage save(ProductImage object) {
        return productImageRepository.save(object);
    }

    @Override
    public List<ProductImage> findAllByProductAndActive(Product productId) {
        return productImageRepository.findAllByProductAndStatus(productId, true);
    }

}
