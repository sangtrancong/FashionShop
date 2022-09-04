package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.CommentDTO;
import com.springcloud.shop.model.dto.CommentRatingDTO;
import com.springcloud.shop.model.dto.OrderDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.*;
import com.springcloud.shop.model.mapper.AccountMapper;
import com.springcloud.shop.model.mapper.OrderDetailsMapper;
import com.springcloud.shop.model.mapper.OrderMapper;
import com.springcloud.shop.service.*;
import com.springcloud.shop.utils.Contants;
import com.springcloud.shop.utils.Utils;
import com.springcloud.shop.utils.ValidatorUtil;
import com.springcloud.shop.validator.OderValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private OrderDetailsService orderDetailsService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private OderValidator oderValidator;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderDetailsMapper orderDetailsMapper;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private Utils utils;

    @GetMapping("/list")
    public ResponseEntity<RestReponseDTO> findAll() {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(orderMapper.toListDTO(orderService.findAll()));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/progress/{progress}")
    public ResponseEntity<RestReponseDTO> findByProgress(@PathVariable String progress) {
        RestReponseDTO restReponse = new RestReponseDTO();
        if (progress != null && progress.equalsIgnoreCase("ALL")) {
            restReponse.ok(orderMapper.toListDTO(orderService.findAll()));
        } else {
            restReponse.ok(orderMapper.toListDTO(orderService.findByProgress(progress)));
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestReponseDTO> findById(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Orders order = orderService.findById(id);
        if (order == null) {
            restReponse.fail();
        } else {
            restReponse.ok(orderMapper.toDTO(order));
        }
        restReponse.addMetadata(Contants.ACCOUNT_SHIPPER, utils.convertObjectToJson(accountMapper.toListDTO(accountService.findAllByShipper(roleService.findByName(Contants.ROLE_SHIPPER)))));
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@RequestBody OrderDTO orderDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        // validator
        oderValidator.validate(orderDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restReponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
        }

        Orders orders = orderService.findById(orderDTO.getId());
        if (!ObjectUtils.isEmpty(orders)) {
            orders.setShipper(accountService.findById(orderDTO.getShipperId()));
            if (orderDTO.getProgress() != null && !orderDTO.getProgress().equalsIgnoreCase("")) {
                orders.setProgress(orderDTO.getProgress());
            }

            if (orderDTO.getProgress() != null && orderDTO.getProgress().equalsIgnoreCase("COMPLETED")) {
                orders.setPayCost(true);
            }

            orders.setStatus(orderDTO.isStatus());

            // save
            orderService.save(orders);
        }

        restReponse.ok(orderMapper.toDTO(orders));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<RestReponseDTO> findByOrder(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        Orders order  = orderService.findById(id);
        List<OrderDetails> orders = orderDetailsService.findByOrder(order);
        if (CollectionUtils.isEmpty(orders)) {
            restReponse.fail();
        } else {
            restReponse.ok(orderDetailsMapper.toListDTO(orders));
        }

        restReponse.addMetadata(Contants.ACCOUNT_SHIPPER, utils.convertObjectToJson(accountMapper.toListDTO(accountService.findAllByShipper(roleService.findByName(Contants.ROLE_SHIPPER)))));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/delivery/{id}")
    public ResponseEntity<RestReponseDTO> findAllByShipper(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();
        restReponse.ok(orderMapper.toListDTO(orderService.findByShipper(id)));

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @GetMapping("/update-payment/{id}")
    public ResponseEntity<RestReponseDTO> updatePayment(@PathVariable long id) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Orders order = orderService.findById(id);
        if (order == null) {
            restReponse.fail();
        } else {
            order.setPayCost(true);
            orderService.save(order);
            restReponse.ok(orderMapper.toDTO(order));
        }
        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

    @PostMapping(value = "/commentandrating")
    public ResponseEntity<RestReponseDTO> commentAndRating(@RequestBody CommentRatingDTO commentRatingDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Account account = accountService.findById(commentRatingDTO.getAccountId());
        Product product = productService.findById(commentRatingDTO.getProductId());

        // comment
        Comment comment = new Comment();
        comment.setAccount(account);
        comment.setProduct(product);
        comment.setComment(commentRatingDTO.getComment());
        comment.setStatus(true);
        commentService.save(comment);

        // rating
        if (commentRatingDTO.getRating() > 0) {
            Rating rating = new Rating();
            rating.setAccount(account);
            rating.setProduct(product);
            rating.setRating(commentRatingDTO.getRating());
            rating.setStatus(true);
            ratingService.save(rating);
        }

        restReponse.ok();

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
