package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.RatingDTO;
import com.springcloud.shop.model.request.RatingRequestDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class RatingValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return RatingDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RatingRequestDTO ratingDTO = (RatingRequestDTO) target;

        // verify rating
        if (ratingDTO == null || ratingDTO.getRating() == 0) {
            errors.rejectValue("rating", "rating.rating.blank", "rating.rating.blank");
        }
    }
}
