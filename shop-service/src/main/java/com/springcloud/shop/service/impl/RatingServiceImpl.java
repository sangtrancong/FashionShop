package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Comment;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.Rating;
import com.springcloud.shop.repository.RatingRepository;
import com.springcloud.shop.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> findByAccount(Account account) {
        Rating rating = new Rating();
        rating.setAccount(account);
        return ratingRepository.findByAccount(rating.getAccount());
    }

    @Override
    public List<Rating> findByProduct(Product product) {
        Rating rating = new Rating();
        rating.setProduct(product);
        return ratingRepository.findByProduct(rating.getProduct());
    }

    @Override
    public Rating findById(long id) {
        Optional<Rating> optional = ratingRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Rating save(Rating object) {
        return ratingRepository.save(object);
    }
}
