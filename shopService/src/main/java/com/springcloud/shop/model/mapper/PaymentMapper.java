package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.PaymentDTO;
import com.springcloud.shop.model.entity.Payment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    PaymentDTO toDTO(Payment payment);

    List<PaymentDTO> toListDTO(List<Payment> payments);

    // to Entity
    Payment toEntity(PaymentDTO paymentDTO);
}
