package com.springcloud.shop.repository;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findByProduct(Product name);

    List<Rating> findByAccount(Account name);

}