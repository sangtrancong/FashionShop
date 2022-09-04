package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.AttributeDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.model.mapper.AttributeMapper;
import com.springcloud.shop.service.AttributeService;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.AttributeValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("api/attributes")
public class AttributeController {

    @Autowired
    private AttributeService attributeService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private AttributeValidator attributeValidator;

    @Autowired
    private AttributeMapper attributeMapper;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(attributeMapper.toListDTO(attributeService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Attribute attribute = attributeService.findById(id);
        if (attribute == null) {
            restReponse.fail();
        } else {
            restReponse.ok(attributeMapper.toDTO(attribute));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody AttributeDTO attributeDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        attributeValidator.validate(attributeDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        Attribute attribute = attributeMapper.toEntity(attributeDTO);
        // save
        attributeService.save(attribute);

        restReponse.ok(attributeMapper.toDTO(attribute));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Attribute attribute = attributeService.findById(id);
        if (attribute == null) {
            restReponse.fail();
        } else {
            attribute.setStatus(false);
            attributeService.save(attribute);
            restReponse.ok(attributeMapper.toDTO(attribute));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
