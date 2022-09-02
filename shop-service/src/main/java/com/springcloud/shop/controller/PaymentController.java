package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.PaymentDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.Payment;
import com.springcloud.shop.model.mapper.PaymentMapper;
import com.springcloud.shop.service.PaymentService;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.PaymentValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private PaymentValidator paymentValidator;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(paymentMapper.toListDTO(paymentService.findAll()));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        Payment payment = paymentService.findById(id);

        if (payment == null) {
            restReponse.fail();
        } else {
            restReponse.ok(paymentMapper.toDTO(payment));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<RestReponseDTO> findByName(@PathVariable String name) {
        RestReponseDTO restReponse = new RestReponseDTO();
        Payment payment = paymentService.findByName(name);

        if (payment == null) {
            restReponse.fail();
        } else {
            restReponse.ok(paymentMapper.toDTO(payment));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody PaymentDTO paymentDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        paymentValidator.validate(paymentDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }
        Payment payment = paymentMapper.toEntity(paymentDTO);
        // save
        paymentService.save(payment);

        restReponse.ok(paymentMapper.toDTO(payment));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> delete(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Payment payment = paymentService.findById(id);
        if (payment == null) {
            restReponse.fail();
        } else {
            payment.setStatus(false);
            paymentService.save(payment);
            restReponse.ok(paymentMapper.toDTO(payment));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }
}
