package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.ProductAttributeDTO;
import com.springcloud.shop.model.dto.ProductImageDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductAttribute;
import com.springcloud.shop.model.entity.ProductImage;
import com.springcloud.shop.model.mapper.ProductAttributesMapper;
import com.springcloud.shop.model.mapper.ProductImageMapper;
import com.springcloud.shop.service.AttributeService;
import com.springcloud.shop.service.ProductAttributeService;
import com.springcloud.shop.service.ProductImageService;
import com.springcloud.shop.service.ProductService;
import com.springcloud.shop.utils.UploadFileUtil;
import com.springcloud.shop.utils.Utils;
import com.springcloud.shop.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping("api/product-attributes")
public class ProductAttributeController {

    @Autowired
    private ProductAttributeService productAttributeService;

    @Autowired
    private ProductService productService;

    @Autowired
    private AttributeService attributeService;

    @Resource
    private ProductAttributesMapper productAttributesMapper;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private Utils utils;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> getList() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(productAttributesMapper.toListDTO(productAttributeService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        ProductAttribute productAttribute = productAttributeService.findById(id);
        if (productAttribute == null) {
            restReponse.fail();
        } else {
            restReponse.ok(productAttributesMapper.toDTO(productAttribute));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<RestReponseDTO> save(@RequestBody ProductAttributeDTO productAttributeDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        //productValidator.validate(productDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        ProductAttribute productAttribute = productAttributesMapper.toEntity(productAttributeDTO);
        // set product
        Product product = productService.findById(productAttributeDTO.getProductId());
        productAttribute.setProduct(product);
        //set attribute
        Attribute attribute = attributeService.findById(productAttributeDTO.getAttributeId());
        productAttribute.setAttribute(attribute);

        restReponse.ok(productAttributeService.save(productAttribute));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        ProductAttribute productAttribute = productAttributeService.findById(id);
        if (productAttribute == null) {
            restReponse.fail();
        } else {
            productAttribute.setStatus(false);
            productAttributeService.save(productAttribute);
            restReponse.ok(productAttributesMapper.toDTO(productAttribute));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
