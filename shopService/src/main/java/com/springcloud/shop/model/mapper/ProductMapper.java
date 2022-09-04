package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.ProductDTO;
import com.springcloud.shop.model.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

public interface ProductMapper {

    // to DTO

    ProductDTO toDTO(Product product);

    List<ProductDTO> toListDTO(List<Product> productList);

    // to Entity

    Product toEntity(Product product, ProductDTO categoryDTO);

}
