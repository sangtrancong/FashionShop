package com.springcloud.shop.service;

public interface EmailService {

    boolean sendEmail(String toEmail, String fromEmail, String subject, String text);

}
