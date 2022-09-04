package com.springcloud.auth.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AccountDTO {

    private String fullname;
    private String email;
    private String password;
    private String passwordNew;

    // custom
    private long accountId;
    private String birthday;
    private String address;
    private String phone;

}
