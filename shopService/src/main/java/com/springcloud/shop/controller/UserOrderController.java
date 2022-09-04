package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.dto.ShopDTO;
import com.springcloud.shop.model.entity.Product;
import com.springcloud.shop.model.mapper.*;
import com.springcloud.shop.service.*;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("api/orders/users")
public class UserOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private Utils utils;

    @GetMapping("/list/{id}")
    public ResponseEntity<RestReponseDTO> findByUser(@PathVariable long id) {
        RestReponseDTO restReponseDTO = new RestReponseDTO();
        restReponseDTO.ok(orderMapper.toListDTO(orderService.findByAccount(id)));

        return new ResponseEntity<RestReponseDTO>(restReponseDTO, HttpStatus.OK);
    }



}
