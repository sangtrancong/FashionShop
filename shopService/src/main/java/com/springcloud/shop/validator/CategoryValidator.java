package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.CategoryDTO;
import com.springcloud.shop.model.entity.Category;
import com.springcloud.shop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CategoryValidator implements Validator {

    @Autowired
    private CategoryService categoryService;

    @Override
    public boolean supports(Class<?> clazz) {
        return CategoryDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CategoryDTO categoryDTO = (CategoryDTO) target;
        Category category = null;

        // verify name
        if (categoryDTO.getName() == null || categoryDTO.getName().isEmpty()) {
            errors.rejectValue("name", "category.name.blank","category.name.blank");
        } else {
            category = categoryService.findByName(categoryDTO.getName());
            if (category != null && category.getId() != categoryDTO.getId()) {
                errors.rejectValue("name", "category.name.exist" ,"category.name.exist");
            }
        }
    }

}
