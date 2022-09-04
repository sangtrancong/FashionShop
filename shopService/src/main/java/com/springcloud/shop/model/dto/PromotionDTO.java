package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromotionDTO {

    private long id;

    private String name;

    private String code;

    private String description;

    // yyyy-MM-dd
    private String startDate;

    // yyyy-MM-dd
    private String endDate;

    private String applyType;

    private String applyCode;

    private String couponType;

    private int couponAmount;

    private boolean status;

}
