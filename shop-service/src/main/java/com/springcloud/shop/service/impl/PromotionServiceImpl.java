package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Promotion;
import com.springcloud.shop.repository.PromotionRepository;
import com.springcloud.shop.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public List<Promotion> findAll() {
        return promotionRepository.findAll();
    }

    @Override
    public Promotion findById(long id) {
        Optional<Promotion> optional = promotionRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Promotion findByCode(String code) {
        Optional<Promotion> optional = promotionRepository.findByCode(code);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Promotion save(Promotion object) {
        return promotionRepository.save(object);
    }
}
