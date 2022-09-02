package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.PromotionDTO;
import com.springcloud.shop.model.entity.Promotion;

import java.util.List;

public interface PromotionMapper {

    // to DTO
    PromotionDTO toDTO(Promotion promotion, String pattern);

    List<PromotionDTO> toListDTO(List<Promotion> promotions, String pattern);

    // to Entity
    Promotion toEntity(PromotionDTO promotionDTO, String pattern);

}
