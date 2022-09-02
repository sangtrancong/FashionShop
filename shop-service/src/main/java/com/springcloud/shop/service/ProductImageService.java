package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductImage;
import java.util.List;

public interface ProductImageService {

    List<ProductImage> findAll();

    ProductImage findById(long id);

    ProductImage save(ProductImage object);

    List<ProductImage> findAllByProductAndActive(Product productId);

}
