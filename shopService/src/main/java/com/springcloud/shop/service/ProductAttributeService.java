package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductAttribute;
import com.springcloud.shop.model.entity.ProductImage;

import java.util.List;

public interface ProductAttributeService {

    List<ProductAttribute> findAll();

    ProductAttribute findById(long id);

    ProductAttribute save(ProductAttribute object);

    List<ProductAttribute> findAllByProductAndActive(Product productId);

}
