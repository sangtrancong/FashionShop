package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.ProductImageDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.entity.ProductImage;
import com.springcloud.shop.model.mapper.ProductImageMapper;
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
@RequestMapping("api/product-images")
public class ProductImageController {

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private ProductService productService;

    @Resource
    private ProductImageMapper productImageMapper;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private Utils utils;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> getList() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(productImageMapper.toListDTO(productImageService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        ProductImage productImage = productImageService.findById(id);
        if (productImage == null) {
            restReponse.fail();
        } else {
            restReponse.ok(productImageMapper.toDTO(productImage));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<RestReponseDTO> save(@RequestBody ProductImageDTO productImageDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        //productValidator.validate(productDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        ProductImage productImage = productImageMapper.toEntity(productImageDTO);
        //upload file
        if(!StringUtils.isEmpty(productImageDTO.getAvatarMul().getOriginalFilename())){
            String urlImage = uploadFileUtil.uploadFileResultFileName(productImageDTO.getAvatarMul());
            productImage.setImage(urlImage);
        }
        // set category
        Product product = productService.findById(productImageDTO.getProductId());
        productImage.setProduct(product);

        restReponse.ok(productImageService.save(productImage));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        ProductImage productImage = productImageService.findById(id);
        if (productImage == null) {
            restReponse.fail();
        } else {
            productImage.setStatus(false);
            productImageService.save(productImage);
            restReponse.ok(productImageMapper.toDTO(productImage));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
