package com.springcloud.shop.service;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.model.entity.Category;

import java.util.List;

public interface AttributeService {

    List<Attribute> findAll();

    Attribute findById(long id);

    Attribute findByName(String name);

    Attribute save(Attribute object);

    List<Attribute> findAllByActive();

    List<Attribute> findAllByActiveInListIdSize(ShopDTO shopDTO);

    List<Attribute> findAllByActiveInListIdColor(ShopDTO shopDTO);
}
