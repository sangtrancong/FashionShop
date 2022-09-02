package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheckoutDTO {

    private long accountId;
    private long id;
    private String email;
    private String address;
    private String phone;
    private String payment;
    private List<CheckoutProductDTO> products;

    private long totalCost;
    private long promotionId;

}
