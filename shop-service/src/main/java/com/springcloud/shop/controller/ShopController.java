package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.ProductDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.mapper.*;
import com.springcloud.shop.service.*;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.Utils;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.AccountValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/shops")
public class ShopController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private AttributeService attributeService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductMapper productMapper;

    @Resource
    private CategoryMapper categoryMapper;

    @Resource
    private BrandMapper brandMapper;

    @Resource
    private AttributeMapper attributeMapper;

    @Resource
    private CommentMapper commentMapper;

    @Resource
    private RatingMapper ratingMapper;

    @Autowired
    private Utils utils;

    @PostMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll(@RequestBody ShopDTO shopDTO) {
        RestReponseDTO restReponseDTO = new RestReponseDTO();
        List<ProductDTO> productSort = productMapper.toListDTO(productService.findProduct(shopDTO));
        List<ProductDTO> sortedList;
        if (!StringUtils.isEmpty(shopDTO.getSortBy()) && shopDTO.getSortBy().equals("nameASC")) {
            sortedList = productSort.stream()
                    .sorted(Comparator.comparing(ProductDTO::getName))
                    .collect(Collectors.toList());
        } else {
            sortedList = productSort.stream()
                    .sorted(Comparator.comparing(ProductDTO::getName).reversed())
                    .collect(Collectors.toList());
        }
        restReponseDTO.ok(sortedList);
        restReponseDTO.addMetadata(Contants.TOTAL_RECORDS, String.valueOf(productService.findAllByActive().size()));
        restReponseDTO.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.SIZES, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.COLORS, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.PRODUCT_HOT, utils.convertObjectToJson(productMapper.toListDTO(productService.findProductTopPromotion())));

        return new ResponseEntity<RestReponseDTO>(restReponseDTO, HttpStatus.OK);
    }

    @PostMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponseDTO = new RestReponseDTO();
        Product product = productService.findById(id);
        restReponseDTO.ok(productMapper.toDTO(product));
        restReponseDTO.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.SIZES, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.COLORS, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.PRODUCT_RELATED, utils.convertObjectToJson(
                productMapper.toListDTO(productService.findByRelated(product != null ? product.getCategory().getId() : 0))));
        restReponseDTO.addMetadata(Contants.COMMENTS, utils.convertObjectToJson(commentMapper.toListDTO(commentService.findByProduct(product))));
        restReponseDTO.addMetadata(Contants.RATINGS, utils.convertObjectToJson(ratingMapper.toListDTO(ratingService.findByProduct(product))));

        return new ResponseEntity<RestReponseDTO>(restReponseDTO, HttpStatus.OK);
    }

    @PostMapping("/order/{userid}/{productid}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long userid, @PathVariable long productid) {
        RestReponseDTO restReponseDTO = new RestReponseDTO();
        Product product = productService.findById(userid);
        restReponseDTO.ok(productMapper.toDTO(product));
        restReponseDTO.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.SIZES, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.COLORS, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.PRODUCT_RELATED, utils.convertObjectToJson(
                productMapper.toListDTO(productService.findByRelated(product != null ? product.getCategory().getId() : 0))));
        restReponseDTO.addMetadata(Contants.COMMENTS, utils.convertObjectToJson(commentMapper.toListDTO(commentService.findByProduct(product))));
        restReponseDTO.addMetadata(Contants.RATINGS, utils.convertObjectToJson(ratingMapper.toListDTO(ratingService.findByProduct(product))));
        restReponseDTO.addMetadata(Contants.ACCOUNT_BUY, orderService.findByAccountAndProduct(userid, productid) ? "SUCCESS" : "ERROR");

        return new ResponseEntity<RestReponseDTO>(restReponseDTO, HttpStatus.OK);
    }

    @PostMapping("/list/{name}")
    public ResponseEntity<RestReponseDTO> findAllProductByName(@PathVariable String name) {
        RestReponseDTO restReponseDTO = new RestReponseDTO();

        restReponseDTO.ok(productMapper.toListDTO(productService.findByKey(name)));
        restReponseDTO.addMetadata(Contants.TOTAL_RECORDS, String.valueOf(productService.findAllByActive().size()));
        restReponseDTO.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.SIZES, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));
        restReponseDTO.addMetadata(Contants.COLORS, utils.convertObjectToJson(attributeMapper.toListDTO(attributeService.findAllByActive())));

        return new ResponseEntity<RestReponseDTO>(restReponseDTO, HttpStatus.OK);
    }

}
