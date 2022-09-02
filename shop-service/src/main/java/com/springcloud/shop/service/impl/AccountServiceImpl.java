package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.model.entity.Attribute;
import com.springcloud.shop.model.entity.Role;
import com.springcloud.shop.repository.AccountRepository;
import com.springcloud.shop.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account findById(long id) {
        Optional<Account> optional = accountRepository.findById(id);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Account findByUsername(String name) {
        Optional<Account> optional = accountRepository.findByUsername(name);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Account findByEmail(String email) {
        Optional<Account> optional = accountRepository.findByEmail(email);
        return optional.isEmpty() ? null : optional.get();
    }

    @Override
    public Account save(Account object) {
        return accountRepository.save(object);
    }

    @Override
    public List<Account> findAllByActive() {
        return accountRepository.findAllByStatus(true);
    }

    @Override
    public List<Account> findAllByShipper(Role role) {
        return accountRepository.findAllByRole(role);
    }

    @Override
    public List<Account> findByOnDate(String startDate, String endDate, int role) {
        return accountRepository.findAllByOnDate(startDate, endDate, role);
    }
}
