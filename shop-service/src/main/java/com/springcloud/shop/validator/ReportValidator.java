package com.springcloud.shop.validator;

import com.springcloud.shop.model.request.ReportRequestDTO;
import com.springcloud.shop.service.OrderService;
import com.springcloud.shop.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ReportValidator  implements Validator {

    @Autowired
    OrderService orderService;

    @Autowired
    DateUtil dateUtil;

    @Override
    public boolean supports(Class<?> aClass) {
        return ReportRequestDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ReportRequestDTO dto = (ReportRequestDTO) o;
        if (ObjectUtils.isEmpty(dto.getStartDate())) {
            errors.rejectValue("startDate", "report.startDate.blank", "report.startDate.blank");
        }

        if (ObjectUtils.isEmpty(dto.getEndDate())) {
            errors.rejectValue("endDate", "report.endDate.blank", "report.endDate.blank");
        }

        if (!ObjectUtils.isEmpty(dto.getStartDate()) && !ObjectUtils.isEmpty(dto.getEndDate())
                && !dateUtil.compareDate(dto.getEndDate(), dto.getStartDate()) && !dto.getStartDate().equals(dto.getEndDate())) {
            errors.rejectValue("startDate", "report.startDate.moreThan", "report.startDate.moreThan");
        }

    }
}
