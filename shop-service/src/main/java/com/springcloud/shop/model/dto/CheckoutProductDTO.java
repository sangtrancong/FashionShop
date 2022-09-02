package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutProductDTO {

    private long productId;
    private double price;
    private int quantity;
    private String attributeType;
    private String attributeName;

}
