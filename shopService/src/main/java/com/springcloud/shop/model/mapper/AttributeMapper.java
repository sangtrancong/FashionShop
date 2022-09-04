package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.AttributeDTO;
import com.springcloud.shop.model.entity.Attribute;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttributeMapper {

    // to DTO
    AttributeDTO toDTO(Attribute attribute);

    List<AttributeDTO> toListDTO(List<Attribute> attributes);

    // to Entity
    Attribute toEntity(AttributeDTO attributeDTO);
}