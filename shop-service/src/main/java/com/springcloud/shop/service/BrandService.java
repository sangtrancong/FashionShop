package com.springcloud.shop.service;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.entity.Category;

import java.util.List;

public interface BrandService {

    List<Brand> findAll();

    Brand findById(long id);

    Brand findByName(String name);

    Brand save(Brand object);

    List<Brand> findAllByActive();

    List<Brand> findAllByActiveInListId(ShopDTO shopDTO);
}
