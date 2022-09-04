package com.springcloud.shop.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AccountDTO {

    private long id;

    private long shipperId;

    private String fullname;

    private String email;

    private String username;

    private String birthday;

    private String phone;

    private int gender;

    private String address;

    private boolean status;

    private String roleName;

//    private String password;

//    private boolean accountNonLocked;
//
//    private boolean accountNonExpired;
//
//    private boolean credentialsNonExpired;

    private RoleDTO role;

}
