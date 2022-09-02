package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandDTO {

    private long id;

    private String name;

    private String description;

    private boolean status;

}
