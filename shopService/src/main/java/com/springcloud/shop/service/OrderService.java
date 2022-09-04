package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Orders;

import java.util.List;

public interface OrderService {

    List<Orders> findAll();

    List<Orders> findByProgress(String progress);

    List<Orders> findByAccount(long userId);

    Orders findById(long id);

    Orders save(Orders orders);

    List<Orders> findByShipper(long userId);

    boolean findByAccountAndProduct(long userId, long productId);

    List<Orders> findByOnDate(String startDate, String endDate);

}
