package com.springcloud.auth.service.impl;

import com.springcloud.auth.model.entity.Role;
import com.springcloud.auth.repository.RoleRepository;
import com.springcloud.auth.service.RoleService;
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
