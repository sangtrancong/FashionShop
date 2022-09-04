package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ShopDTO {

    private int firstRecord;

    private int numberRecords;

    private String sortBy;

    private List<Integer> categoryIds;

    private List<Integer> brandIds;

    private List<Integer> attributeIds;

}
