package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.CategoryDTO;
import com.springcloud.shop.model.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    // to DTO
    CategoryDTO toDTO(Category category);

    List<CategoryDTO> toListDTO(List<Category> categoryList);

    // to Entity
    Category toEntity(CategoryDTO categoryDTO);

}
