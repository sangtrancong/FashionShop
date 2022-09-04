package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductAttributeDTO {

    private long id;

    private long attributeId;

    private long productId;

    private int quantity;

    private Double price;

    private Double discount;

    private boolean status;

    // custom
    private AttributeDTO attribute;

}
