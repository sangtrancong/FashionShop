package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.ProductImageDTO;
import com.springcloud.shop.model.entity.ProductImage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {

    // to DTO
    ProductImageDTO toDTO(ProductImage productImage);

    List<ProductImageDTO> toListDTO(List<ProductImage> productImageList);

    // to Entity
    ProductImage toEntity(ProductImageDTO productImageDTO);

}
