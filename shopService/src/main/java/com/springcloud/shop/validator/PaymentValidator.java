package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.PaymentDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PaymentValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return PaymentDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PaymentDTO paymentDTO = (PaymentDTO) target;

        // verify username
        if (paymentDTO.getName().isEmpty()) {
            errors.rejectValue("name", "payment.name.blank", "payment.name.blank");
        }
    }
}
