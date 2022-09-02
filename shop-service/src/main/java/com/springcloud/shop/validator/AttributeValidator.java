package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.AttributeDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AttributeValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return AttributeDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        AttributeDTO attributeDTO = (AttributeDTO) target;
        // validator username
        if(attributeDTO.getName().isEmpty()){
            errors.rejectValue("name", "attribute.name.blank",
                    "attribute.name.blank");
        }
    }
}
