package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DashboardDTO {
    private int totalOrder;
    private double totalCost;
    private int totalUser;
    private int totalProduct;
    List<OrderDTO> orderDTOList;
}
