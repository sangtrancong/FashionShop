package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDTO extends BaseDTO {

    private long id;

    private long productId;

    private long accountId;

    private ProductDTO product;

    private AccountDTO account;

    private int rating;

    private boolean status;
}
