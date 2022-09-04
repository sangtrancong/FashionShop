package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Orders;
import com.springcloud.shop.model.entity.OrderDetails;
import com.springcloud.shop.repository.OrderDetailsRepository;
import com.springcloud.shop.repository.OrderRepository;
import com.springcloud.shop.service.OrderDetailsService;
import org.mapstruct.ap.internal.option.Options;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {

    @Autowired
    private OrderDetailsRepository detailsRepository;

    @Override
    public List<OrderDetails> findByOrder(Orders order) {
        return detailsRepository.findByOrder(order);
    }

    @Override
    public List<OrderDetails> saveAll(List<OrderDetails> orderDetails) {
        return detailsRepository.saveAll(orderDetails);
    }

}
