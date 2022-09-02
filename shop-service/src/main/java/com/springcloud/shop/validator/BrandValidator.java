package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.BrandDTO;
import com.springcloud.shop.model.entity.Brand;
import com.springcloud.shop.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BrandValidator implements Validator {

    @Autowired
    private BrandService brandService;

    @Override
    public boolean supports(Class<?> aClass) {
        return BrandDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        BrandDTO brandDTO = (BrandDTO) target;
        Brand brand = null;

        // verify name
        if (brandDTO.getName() == null || brandDTO.getName().isEmpty()){
            errors.rejectValue("name", "brand.name.blank", "brand.name.blank");
        } else {
            brand = brandService.findByName(brandDTO.getName());
            if (brand != null && brand.getId() != brandDTO.getId()) {
                errors.rejectValue("name", "brand.name.exist" ,"brand.name.exist");
            }
        }

    }
}
