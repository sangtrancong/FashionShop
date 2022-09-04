package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {

    List<ProductAttribute> findAllByProductAndStatus(Product product, boolean status);

}

