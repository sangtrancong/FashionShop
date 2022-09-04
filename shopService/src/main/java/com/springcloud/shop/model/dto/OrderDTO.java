package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderDTO {

    private long id;

    private long accountId;

    private long paymentId;

    private long promotionId;

    private long shipperId;

    private String progress;

    private double totalCost;

    private boolean payCost;

    private boolean status;

    private Date createdOn;

    // custom data
    private AccountDTO account;
    private PaymentDTO payment;
    private PromotionDTO promotion;
    private List<OrderDetailsDTO> orderDetails;

}
