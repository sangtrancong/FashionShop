package com.springcloud.shop.model.mapper.impl;

import com.springcloud.shop.model.dto.AccountDTO;
import com.springcloud.shop.model.dto.RoleDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Role;
import com.springcloud.shop.model.mapper.AccountMapper;
import com.springcloud.shop.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AccountMapperImpl implements AccountMapper {

    @Autowired
    DateUtil dateUtil;

    @Override
    public AccountDTO toDTO(Account account) {
        if ( account == null ) {
            return null;
        }

        AccountDTO accountDTO = new AccountDTO();

        if ( account.getId() != null ) {
            accountDTO.setId( account.getId() );
        }
        accountDTO.setFullname( account.getFullname() );
        accountDTO.setEmail( account.getEmail() );
        accountDTO.setUsername( account.getUsername() );
        if(account.getBirthday() != null) {
            accountDTO.setBirthday(dateUtil.convertDateToString(account.getBirthday(), "yyyy-MM-dd"));
        }
        accountDTO.setPhone( account.getPhone() );
        accountDTO.setGender( account.getGender() );
        accountDTO.setAddress( account.getAddress() );
        accountDTO.setStatus( account.isStatus() );
        accountDTO.setRole( roleToRoleDTO( account.getRole() ) );

        return accountDTO;
    }

    @Override
    public List<AccountDTO> toListDTO(List<Account> accounts) {
        if ( accounts == null ) {
            return null;
        }

        List<AccountDTO> list = new ArrayList<AccountDTO>( accounts.size() );
        for ( Account account : accounts ) {

            list.add( toDTO( account ) );
        }

        return list;
    }

    @Override
    public Account toEntity(AccountDTO accountDTO) {
        if ( accountDTO == null ) {
            return null;
        }

        Account account = new Account();

        account.setId( accountDTO.getId() );
        account.setFullname( accountDTO.getFullname() );
        account.setEmail( accountDTO.getEmail() );
        account.setUsername( accountDTO.getUsername() );
        if (!"".equals(accountDTO.getBirthday())) {
            account.setBirthday(dateUtil.convertStringToDate(accountDTO.getBirthday(), "yyyy-MM-dd"));
        }
        account.setPhone( accountDTO.getPhone() );
        account.setGender( accountDTO.getGender() );
        account.setAddress( accountDTO.getAddress() );
        account.setStatus( accountDTO.isStatus() );
        account.setRole( roleDTOToRole( accountDTO.getRole() ) );

        return account;
    }

    protected RoleDTO roleToRoleDTO(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleDTO roleDTO = new RoleDTO();

        if ( role.getId() != null ) {
            roleDTO.setId( role.getId() );
        }
        roleDTO.setName( role.getName() );
        roleDTO.setStatus( role.isStatus() );

        return roleDTO;
    }

    protected Role roleDTOToRole(RoleDTO roleDTO) {
        if ( roleDTO == null ) {
            return null;
        }

        Role role = new Role();

        role.setId( roleDTO.getId() );
        role.setName( roleDTO.getName() );
        role.setStatus( roleDTO.isStatus() );

        return role;
    }
}
