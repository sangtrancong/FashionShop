package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailsDTO {

    private long id;

    private ProductDTO product;

    private OrderDTO order;

    private int quantity;

    private double price;

    private String attributeType;

    private String attributeName;

    private boolean status;

}
