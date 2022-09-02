package com.springcloud.shop.service;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> findAll();

    Category findById(long id);

    Category findByName(String name);

    Category save(Category object);

    List<Category> findAllByActive();

    List<Category> findAllByActiveInListId(ShopDTO shopDTO);

}
