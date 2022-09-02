package com.springcloud.shop.service;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> findAll();

    List<Product> findByCategory(long id);

    List<Product> findByBrand(long id);

    List<Product> findByRelated(long categoryId);

    Product findById(long id);

    Product findByName(String name);

    Product save(Product object);

    Product findBySku(String sku);

    List<Product> findAllByActive();

    List<Product> findAllByActiveLimit(int firstRecord, int size);

    List<Product> findProduct(ShopDTO shopDTO);

    List<Product> findProductTopRating();

    List<Product> findProductTopComment();

    List<Product> findProductTopPromotion();

    List<Product> findByKey(String name);

    List<Product> findByOnDate(String startDate, String endDate);

}
