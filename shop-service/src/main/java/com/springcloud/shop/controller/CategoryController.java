package com.springcloud.shop.controller;

import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.dto.CategoryDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.mapper.CategoryMapper;
import com.springcloud.shop.service.CategoryService;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.CategoryValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/categorys")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private CategoryValidator categoryValidator;

    @Autowired
    private CategoryMapper categoryMapper;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(categoryMapper.toListDTO(categoryService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Category category = categoryService.findById(id);
        if (category == null) {
            restReponse.fail();
        } else {
            restReponse.ok(categoryMapper.toDTO(category));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody CategoryDTO categoryDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        categoryValidator.validate(categoryDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        // to entity
        Category category = categoryMapper.toEntity(categoryDTO);

        // save
        restReponse.ok(categoryMapper.toDTO(categoryService.save(category)));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Category category = categoryService.findById(id);
        if (category == null) {
            restReponse.fail();
        } else {
            category.setStatus(false);
            categoryService.save(category);
            restReponse.ok(categoryMapper.toDTO(category));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}