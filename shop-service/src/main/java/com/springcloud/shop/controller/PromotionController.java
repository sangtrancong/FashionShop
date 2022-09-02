package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.PromotionDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Promotion;
import com.springcloud.shop.model.mapper.AccountMapper;
import com.springcloud.shop.model.mapper.BrandMapper;
import com.springcloud.shop.model.mapper.CategoryMapper;
import com.springcloud.shop.model.mapper.ProductMapper;
import com.springcloud.shop.model.mapper.impl.PromotionMapperImpl;
import com.springcloud.shop.service.*;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.DateUtil;
import com.springcloud.shop.utils.Utils;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.PromotionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("api/promotions")
public class PromotionController {

    private static final String PATTERN = "yyyy-MM-dd";

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private PromotionValidator promotionValidator;

    @Autowired
    private PromotionMapperImpl promotionMapper;

    @Autowired
    private Utils utils;

    @Resource
    private CategoryMapper categoryMapper;

    @Resource
    private BrandMapper brandMapper;

    @Resource
    private ProductMapper productMapper;

    @Resource
    private AccountMapper accountMapper;

    @Autowired
    private DateUtil dateUtil;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(promotionMapper.toListDTO(promotionService.findAll(), PATTERN));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Promotion promotion = promotionService.findById(id);
        if (promotion == null) {
            restReponse.fail();
        } else {
            restReponse.ok(promotionMapper.toDTO(promotion, PATTERN));
            restReponse.addMetadata(Contants.ACCOUNTS, utils.convertObjectToJson(accountMapper.toListDTO(accountService.findAllByActive())));
            restReponse.addMetadata(Contants.PRODUCTS, utils.convertObjectToJson(productMapper.toListDTO(productService.findAllByActive())));
            restReponse.addMetadata(Contants.CATEGORYS, utils.convertObjectToJson(categoryMapper.toListDTO(categoryService.findAllByActive())));
            restReponse.addMetadata(Contants.BRANDS, utils.convertObjectToJson(brandMapper.toListDTO(brandService.findAllByActive())));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<RestReponseDTO> findByCode(@PathVariable String code) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Promotion promotion = promotionService.findByCode(code);
        if (promotion == null) {
            restReponse.fail();
        } else {
            restReponse.ok(promotionMapper.toDTO(promotion, PATTERN));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody PromotionDTO promotionDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        promotionValidator.validate(promotionDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        Promotion promotion = promotionMapper.toEntity(promotionDTO,
                PATTERN);
        // save
        promotionService.save(promotion);

        restReponse.ok(promotionMapper.toDTO(promotion, PATTERN));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Promotion promotion = promotionService.findById(id);
        if (promotion == null) {
            restReponse.fail();
        } else {
            promotion.setStatus(false);
            promotionService.save(promotion);
            restReponse.ok(promotionMapper.toDTO(promotion, PATTERN));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<RestReponseDTO> verify(@PathVariable String code) {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.fail();

        Promotion promotion = promotionService.findByCode(code);
        if (promotion == null) {
            restReponse.fail();
        } else {
            switch (promotion.getApplyType()) {
                case "ALL":
                    if (compareDate(promotion)) {
                        restReponse.ok();
                    }
                    break;
                default:
                    restReponse.fail();
                    break;
            }
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/expire/{code}")
    public ResponseEntity<RestReponseDTO> expire(@PathVariable String code) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Promotion promotion = promotionService.findByCode(code);
        if (promotion != null && compareDate(promotion)) {
            restReponse.ok(promotion);
        } else {
            restReponse.fail();
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    private boolean compareDate(Promotion promotion) {
        Date date = new Date();
        if (promotion.getStartDate().before(date) && promotion.getEndDate().after(date)) {
            return true;
        }
        return false;
    }

}
