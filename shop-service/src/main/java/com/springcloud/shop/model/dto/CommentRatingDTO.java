package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRatingDTO {

    private long id;

    private long productId;

    private long accountId;

    private String comment;

    private int rating;

    private boolean status;

}
