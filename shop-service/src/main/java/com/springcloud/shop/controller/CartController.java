package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.mapper.BrandMapper;
import com.springcloud.shop.model.mapper.CategoryMapper;
import com.springcloud.shop.model.mapper.ProductMapper;
import com.springcloud.shop.service.BrandService;
import com.springcloud.shop.service.CategoryService;
import com.springcloud.shop.service.ProductService;
import com.springcloud.shop.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("api/carts")
public class CartController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private ProductMapper productMapper;

    @Resource
    private CategoryMapper categoryMapper;

    @Resource
    private BrandMapper brandMapper;

    @Autowired
    private Utils utils;

    @GetMapping("/save")
    public ResponseEntity<RestReponseDTO> save() {
        RestReponseDTO restReponse = new RestReponseDTO();


        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }


}
