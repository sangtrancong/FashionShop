package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.Rating;

import java.util.List;

public interface RatingService {

    List<Rating> findAll();

    List<Rating> findByAccount(Account account);

    List<Rating> findByProduct(Product product);

    Rating findById(long id);

    Rating save(Rating object);
}
