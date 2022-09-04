package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    List<ProductImage> findAllByProductAndStatus(Product product, boolean status);

}

