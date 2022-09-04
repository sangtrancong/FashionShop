package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Payment;
import com.springcloud.shop.repository.PaymentRepository;
import com.springcloud.shop.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment findById(long id) {
        Optional<Payment> optional = paymentRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Payment findByName(String name) {
        Optional<Payment> optional = paymentRepository.findByName(name);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Payment save(Payment object) {
        return paymentRepository.save(object);
    }
}
