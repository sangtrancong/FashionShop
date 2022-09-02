package com.springcloud.shop.service.impl;

import com.springcloud.shop.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public boolean sendEmail(String toEmail, String fromEmail, String subject, String text) {

        return false;
    }

}
