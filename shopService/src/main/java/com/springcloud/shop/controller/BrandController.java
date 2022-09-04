package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.BrandDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.model.mapper.BrandMapper;
import com.springcloud.shop.service.BrandService;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.BrandValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("api/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private BrandMapper brandMapper;

    @Autowired
    private BrandValidator brandValidator;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(brandMapper.toListDTO(brandService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        Brand brand = brandService.findById(id);

        if (brand == null) {
            restReponse.fail();
        } else {
            restReponse.ok(brandMapper.toDTO(brand));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<RestReponseDTO> findByName(@PathVariable String name) {
        RestReponseDTO restReponse = new RestReponseDTO();
        Brand brand = brandService.findByName(name);

        if (brand == null) {
            restReponse.fail();
        } else {
            restReponse.ok(brandMapper.toDTO(brand));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody BrandDTO brandDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        brandValidator.validate(brandDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }
        Brand brand = brandMapper.toEntity(brandDTO);
        // save
        brandService.save(brand);

        restReponse.ok(brandMapper.toDTO(brand));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Brand brand = brandService.findById(id);
        if (brand == null) {
            restReponse.fail();
        } else {
            brand.setStatus(false);
            brandService.save(brand);
            restReponse.ok(brandMapper.toDTO(brand));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }
}
