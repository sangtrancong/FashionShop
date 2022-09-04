package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.repository.CategoryRepository;
import com.springcloud.shop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(long id) {
        Optional<Category> optional = categoryRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Category findByName(String name) {
        Optional<Category> optional = categoryRepository.findByName(name);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Category save(Category object) {
        return categoryRepository.save(object);
    }

    @Override
    public List<Category> findAllByActive() {
        return categoryRepository.findAllByStatus(true);
    }

    @Override
    public List<Category> findAllByActiveInListId(ShopDTO shopDTO) {
        return categoryRepository.findAllByActiveInListId(shopDTO.getCategoryIds());
    }

}
