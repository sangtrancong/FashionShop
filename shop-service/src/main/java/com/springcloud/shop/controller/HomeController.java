package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.model.mapper.BrandMapper;
import com.springcloud.shop.model.mapper.CategoryMapper;
import com.springcloud.shop.model.mapper.ProductMapper;
import com.springcloud.shop.service.BrandService;
import com.springcloud.shop.service.CategoryService;
import com.springcloud.shop.service.ProductService;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("api/homes")
public class HomeController {

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

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(productMapper.toListDTO(productService.findAllByActiveLimit(0,6)));
        restReponse.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
        restReponse.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
        restReponse.addMetadata(Contants.PRODUCT_RATINGS, utils.convertObjectToJson(productMapper.toListDTO(productService.findProductTopRating())));
        restReponse.addMetadata(Contants.PRODUCT_COMMENTS, utils.convertObjectToJson(productMapper.toListDTO(productService.findProductTopComment())));
        restReponse.addMetadata(Contants.PRODUCT_PROMOTIONS, utils.convertObjectToJson(productMapper.toListDTO(productService.findProductTopPromotion())));
        restReponse.addMetadata(Contants.PRODUCT_HOT, utils.convertObjectToJson(productMapper.toListDTO(productService.findProductTopPromotion())));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
