package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.OrderDTO;
import com.springcloud.shop.model.entity.Orders;

import java.util.List;

public interface OrderMapper {

    // to DTO
    OrderDTO toDTO(Orders order);

    List<OrderDTO> toListDTO(List<Orders> orders);

    // to Entity
    Orders toEntity(OrderDTO orderDTO);

}
