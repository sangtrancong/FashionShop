package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.repository.BrandRepository;
import com.springcloud.shop.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(long id) {
        Optional<Brand> optional = brandRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Brand findByName(String name) {
        Optional<Brand> optional = brandRepository.findByName(name);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Brand save(Brand object) {
        return brandRepository.save(object);
    }

    @Override
    public List<Brand> findAllByActive() {
        return brandRepository.findAllByStatus(true);
    }

    @Override
    public List<Brand> findAllByActiveInListId(ShopDTO shopDTO) {
        return brandRepository.findAllByActiveInListId(shopDTO.getBrandIds());
    }

}
