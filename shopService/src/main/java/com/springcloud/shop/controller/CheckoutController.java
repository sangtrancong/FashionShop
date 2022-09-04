package com.springcloud.shop.controller;

import com.springcloud.shop.model.dto.CheckoutDTO;
import com.springcloud.shop.model.dto.CheckoutProductDTO;
import com.springcloud.shop.model.dto.RestReponseDTO;
import com.springcloud.shop.model.entity.*;
import com.springcloud.shop.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/checkouts")
public class CheckoutController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailsService orderDetailsService;

    @Autowired
    private ProductService productService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PromotionService promotionService;

    @PostMapping(value = "/save")
    public ResponseEntity<RestReponseDTO> save(@Valid @RequestBody CheckoutDTO checkoutDTO, BindingResult bindingResult) {
        RestReponseDTO restReponse = new RestReponseDTO();

        Orders order = new Orders();

        // account
        Account account = accountService.findById(checkoutDTO.getAccountId());
        if (account == null) {
            restReponse.fail();
        } else {
            order.setAccount(account);
            // payment
            Payment payment = paymentService.findByName(checkoutDTO.getPayment());
            order.setPayment(payment);
            // promotion
            Promotion promotion = promotionService.findById(checkoutDTO.getPromotionId());
            if (promotion != null) {
                order.setPromotion(promotion);
            }
            order.setTotalCost(checkoutDTO.getTotalCost());
            order.setProgress("PENDING");
            order.setStatus(true);
            orderService.save(order);

            List<OrderDetails> orderDetailsList = new ArrayList<>();
            if (checkoutDTO.getProducts() != null) {
                for (CheckoutProductDTO checkoutProductDTO : checkoutDTO.getProducts()) {
                    // detail
                    OrderDetails orderDetail = new OrderDetails();
                    orderDetail.setOrder(order);
                    orderDetail.setPrice(checkoutProductDTO.getPrice());
                    orderDetail.setQuantity(checkoutProductDTO.getQuantity());
                    // product
                    Product product = productService.findById(checkoutProductDTO.getProductId());
                    orderDetail.setProduct(product);
                    orderDetail.setStatus(true);

                    // attribute
                    orderDetail.setAttributeType(checkoutProductDTO.getAttributeType());
                    orderDetail.setAttributeName(checkoutProductDTO.getAttributeName());
                    orderDetailsList.add(orderDetail);
                }
                orderDetailsService.saveAll(orderDetailsList);
            }

            if (order != null && order.getId() > 0) {
                restReponse.ok();
            } else {
                restReponse.fail();
            }
        }

        return new ResponseEntity<RestReponseDTO>(restReponse, HttpStatus.OK);
    }

}
