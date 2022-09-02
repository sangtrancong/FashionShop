package com.springcloud.shop.model.dto;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO extends BaseDTO{

    private long id;

    private ProductDTO product;

    private AccountDTO account;

    private String comment;

    private boolean status;

}
