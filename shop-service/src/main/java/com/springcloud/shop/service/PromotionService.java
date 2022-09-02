package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Promotion;

import java.util.List;

public interface PromotionService {

    List<Promotion> findAll();

    Promotion findById(long id);

    Promotion findByCode(String code);

    Promotion save(Promotion object);
}
