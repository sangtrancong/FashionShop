package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.CommentDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CommentValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return CommentDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CommentDTO commentDTO = (CommentDTO) target;

        // verify comment
        if (commentDTO.getComment() == null || commentDTO.getComment().isEmpty()) {
            errors.rejectValue("name", "comment.comment.blank","comment.comment.blank");
        }
    }

}
