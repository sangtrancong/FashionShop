package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.OrderDetailsDTO;
import com.springcloud.shop.model.entity.OrderDetails;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDetailsMapper {

    // to DTO
    OrderDetailsDTO toDTO(OrderDetails order);

    List<OrderDetailsDTO> toListDTO(List<OrderDetails> orders);

    // to Entity
    OrderDetails toEntity(OrderDetailsDTO orderDTO);

}
