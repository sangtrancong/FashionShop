package com.springcloud.shop.model.request;

import com.springcloud.shop.model.dto.BaseDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingRequestDTO {

    private long id;

    private long productId;

    private long accountId;

    private int rating;

    private boolean status;
}
