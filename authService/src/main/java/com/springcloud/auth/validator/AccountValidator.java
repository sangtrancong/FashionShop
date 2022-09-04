package com.springcloud.auth.validator;

import com.springcloud.auth.model.dto.AccountDTO;
import com.springcloud.auth.model.entity.Account;
import com.springcloud.auth.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AccountValidator implements Validator {

    @Autowired
    private AccountService accountService;

    @Override
    public boolean supports(Class<?> aClass) {
        return AccountDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        AccountDTO accountDTO = (AccountDTO) target;

        Account account = null;

        // verify fullname
        if (accountDTO.getFullname() == null || accountDTO.getFullname().isEmpty()) {
            errors.rejectValue("fullname", "account.fullname.blank", "account.fullname.blank");
        }

        // verify password
        if (accountDTO.getPassword() == null || accountDTO.getPassword().isEmpty()) {
            errors.rejectValue("password", "account.password.blank", "account.password.blank");
        }

        // verify email
        if (accountDTO.getEmail() == null || accountDTO.getEmail().isEmpty()) {
            errors.rejectValue("email", "account.email.blank", "account.email.blank");
        }  else {
            account = accountService.findByEmail(accountDTO.getEmail());
            if (account != null) {
                errors.rejectValue("email", "account.email.exist" ,"account.email.exist");
            }
        }
    }

}
