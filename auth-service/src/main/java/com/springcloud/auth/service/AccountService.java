package com.springcloud.auth.service;

import com.springcloud.auth.model.entity.Account;

public interface AccountService {

    Account findByEmail(String email);

    Account findById(long id);

    Account save(Account account);

}
