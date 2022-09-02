package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Payment;
import java.util.List;

public interface PaymentService {

    List<Payment> findAll();

    Payment findById(long id);

    Payment findByName(String name);

    Payment save(Payment object);
}
