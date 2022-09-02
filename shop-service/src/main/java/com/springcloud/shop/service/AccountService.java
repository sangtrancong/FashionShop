package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.model.entity.Orders;
import com.springcloud.shop.model.entity.Role;

import java.util.List;

public interface AccountService {

    List<Account> findAll();

    Account findById(long id);

    Account findByUsername(String name);

    Account findByEmail(String email);

    Account save(Account object);

    List<Account> findAllByActive();

    List<Account> findAllByShipper(Role role);

    List<Account> findByOnDate(String startDate, String endDate, int role);

}
