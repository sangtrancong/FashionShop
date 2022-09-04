package com.springcloud.shop.validator;

import com.springcloud.shop.model.dto.AccountDTO;
import com.springcloud.shop.model.entity.Account;
import com.springcloud.shop.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AccountValidator implements Validator {
    @Autowired
    AccountService accountService;

    @Override
    public boolean supports(Class<?> aClass) {
        return AccountDTO.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        AccountDTO accountDTO = (AccountDTO) target;
        // validator username
        if(accountDTO.getUsername().isEmpty()){
            errors.rejectValue("username", "account.username.blank",
                    "account.username.blank");
        } else {
            Account account = accountService.findByUsername(accountDTO.getUsername());
            if (account != null && accountDTO.getId() != account.getId()) {
                errors.rejectValue("username", "account.username.exist" ,"account.username.exist");
            }
        }

        // validator email
        if(accountDTO.getEmail().isEmpty()){
            errors.rejectValue("email", "account.email.blank",
                    "account.email.blank");
        } else {
            Account account = accountService.findByEmail(accountDTO.getEmail());
            if (account != null && accountDTO.getId() != account.getId()) {
                errors.rejectValue("email", "account.email.exist" ,"account.email.exist");
            }
        }

        // validator phone
        if(accountDTO.getPhone().isEmpty()) {
            errors.rejectValue("phone", "account.phone.blank",
                    "account.phone.blank");
        }
    }
}
