package com.springcloud.shop.service;

import com.springcloud.shop.model.entity.Role;

public interface RoleService {

    Role findByName(String name);

}
