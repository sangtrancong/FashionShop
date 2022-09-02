package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.OrderDetails;
import com.springcloud.shop.model.entity.Orders;
import com.springcloud.shop.repository.OrderRepository;
import com.springcloud.shop.service.AccountService;
import com.springcloud.shop.service.OrderDetailsService;
import com.springcloud.shop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private OrderDetailsService orderDetailsService;

    @Override
    public List<Orders> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Orders> findByProgress(String progress) {
        return orderRepository.findByProgress(progress);
    }

    @Override
    public List<Orders> findByAccount(long userId) {
        return orderRepository.findByAccount(accountService.findById(userId));
    }

    @Override
    public Orders findById(long id) {
        Optional<Orders> optional = orderRepository.findById(id);
        return  optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Orders save(Orders orders) {
        return orderRepository.save(orders);
    }

    @Override
    public List<Orders> findByShipper(long userId) {
        return orderRepository.findByShipper(accountService.findById(userId));
    }

    public boolean findByAccountAndProduct(long userId, long productId) {
        List<Orders> ordersList = findByAccount(userId);
        if (ordersList != null) {
            for (Orders orders : ordersList) {
                List<OrderDetails> orderDetailsList = orderDetailsService.findByOrder(orders);
                if (orderDetailsList != null) {
                    for (OrderDetails orderDetails : orderDetailsList) {
                        if (orderDetails.getProduct().getId() == productId) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    @Override
    public List<Orders> findByOnDate(String startDate, String endDate) {
        return orderRepository.findAllByOnDate(startDate, endDate);
    }

}
