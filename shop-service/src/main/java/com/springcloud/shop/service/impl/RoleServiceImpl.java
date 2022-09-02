package com.springcloud.shop.service.impl;

import com.springcloud.shop.model.entity.Role;
import com.springcloud.shop.repository.RoleRepository;
import com.springcloud.shop.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).orElse(null);
    }

}
