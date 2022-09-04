package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.OrderDetails;
import com.springcloud.shop.model.entity.Orders;

import java.util.List;

public interface OrderDetailsService {

    List<OrderDetails> findByOrder(Orders order);

    List<OrderDetails> saveAll(List<OrderDetails> orderDetails);

}
