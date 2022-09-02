package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.PromotionDTO;
import com.springcloud.shop.model.entity.Promotion;
import com.springcloud.shop.service.PromotionService;
import com.springcloud.shop.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Date;

@Component
public class PromotionValidator implements Validator {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private DateUtil dateUtil;

    @Override
    public boolean supports(Class<?> aClass) {
        return Promotion.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PromotionDTO promotionDTO = (PromotionDTO) target;

        String[] valueApplyType = {"ALL", "ACCOUNT", "PRODUCT", "CATEGORY", "BRAND"};
        String pattern = "yyyy-MM-dd";

        Promotion promotion = null;

        if (promotionDTO.getName() == null || promotionDTO.getName().isEmpty()) {
            errors.rejectValue("name", "promotion.name.blank" ,"promotion.name.blank");
        }

        if (promotionDTO.getCouponAmount() == 0) {
            errors.rejectValue("couponAmount", "promotion.couponAmount.blank" ,"promotion.couponAmount.blank");
        }

        // verify name
        if (promotionDTO.getCode() == null || promotionDTO.getCode().isEmpty()){
            errors.rejectValue("code", "promotion.code.blank", "promotion.code.blank");
        } else {
            promotion = promotionService.findByCode(promotionDTO.getCode());
            if (promotion != null && promotion.getId() != promotionDTO.getId()) {
                errors.rejectValue("code", "promotion.code.exist" ,"promotion.code.exist");
            }
        }

        // verify startDate and endDate
        if (promotionDTO.getStartDate() == null || promotionDTO.getStartDate().isEmpty()) {
            errors.rejectValue("startDate", "promotion.startDate.blank" ,"promotion.startDate.blank");
        } else {
            if (!compareDate(promotionDTO.getStartDate(), dateUtil.convertDateToString(new Date(), "yyyy-MM-dd"), pattern)){
                errors.rejectValue("startDate", "promotion.startDate.format","promotion.startDate.format");
            }
        }

        if (promotionDTO.getEndDate() == null || promotionDTO.getEndDate().isEmpty()) {
            errors.rejectValue("endDate", "promotion.endDate.blank" ,"promotion.endDate.blank");
        } else {
            if (!compareDate(promotionDTO.getEndDate(), promotionDTO.getStartDate(), pattern)){
                errors.rejectValue("endDate", "promotion.endDate.format","promotion.endDate.format");
            }
        }

    }

    private boolean isApplyTypes(String value, String[] applyType) {
        for (String s : applyType) {
            if (s.equalsIgnoreCase(value)) {
                return true;
            }
        }
        return false;
    }

    private boolean compareDate(String endDate, String startDate, String pattern) {
        if (!endDate.isEmpty() || !startDate.isEmpty()) {
            Date end = dateUtil.convertStringToDate(endDate, pattern);
            Date start = dateUtil.convertStringToDate(startDate, pattern);
            return start.before(end);
        }
        return false;
    }

}
