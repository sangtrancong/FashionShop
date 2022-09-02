package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.ProductAttributeDTO;
import com.springcloud.shop.model.entity.ProductAttribute;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductAttributesMapper {

    // to DTO
    ProductAttributeDTO toDTO(ProductAttribute productAttribute);

    List<ProductAttributeDTO> toListDTO(List<ProductAttribute> productImageList);

    // to Entity
    ProductAttribute toEntity(ProductAttributeDTO productImageDTO);

}
