package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.RatingDTO;
import com.springcloud.shop.model.entity.Rating;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RatingMapper {

    // to DTO
    RatingDTO toDTO(Rating rating);

    List<RatingDTO> toListDTO(List<Rating> ratings);

    // to Entity
    Rating toEntity(Object ratingDTO);

}
