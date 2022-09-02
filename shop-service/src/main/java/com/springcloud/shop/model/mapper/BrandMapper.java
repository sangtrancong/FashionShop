package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.BrandDTO;
import com.springcloud.shop.model.entity.Brand;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    // to DTO
    BrandDTO toDTO(Brand brand);

    List<BrandDTO> toListDTO(List<Brand> brands);

    // to Entity
    Brand toEntity(BrandDTO brandDTO);
}
