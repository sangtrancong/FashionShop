package com.springcloud.auth.service;

import com.springcloud.auth.model.entity.Role;

public interface RoleService {

    Role findByName(String name);

}
