package com.nocountry.rentify.service;

import com.nocountry.rentify.exception.RoleNotFoundException;
import com.nocountry.rentify.model.entity.Role;
import com.nocountry.rentify.repository.RoleRepository;
import com.nocountry.rentify.service.interfaces.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role getByName(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Role not found: " + roleName));
    }
}