package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.OrderDTO;
import com.springcloud.shop.model.entity.Orders;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class OderValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return Orders.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderDTO orderDTO = (OrderDTO) target;

        if (!ObjectUtils.isEmpty(orderDTO) && orderDTO.getId() == 0) {
            // verify account
            notifyObject(orderDTO.getAccount(), "orders.account", errors);
            // verify applyCode
            notifyObject(orderDTO.getPayment(), "orders.payment", errors);
        }
    }

    private void notifyObject(Object value, String notify, Errors errors) {
        if (ObjectUtils.isEmpty(value)) {
            errors.rejectValue(notify, notify, notify);
        }
    }

    private void notifyField(Object value, String notify, Errors errors) {
        if (StringUtils.isEmpty(value)) {
            errors.rejectValue(notify, notify, notify);
        }
    }

}
