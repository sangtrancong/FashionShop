package com.springcloud.shop.model.mapper;

import com.springcloud.shop.model.dto.AccountDTO;
import com.springcloud.shop.model.dto.AttributeDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Attribute;
import org.mapstruct.Mapper;

import java.util.List;

public interface AccountMapper {

    // to DTO
    AccountDTO toDTO(Account account);

    List<AccountDTO> toListDTO(List<Account> accounts);

    // to Entity
    Account toEntity(AccountDTO accountDTO);
}