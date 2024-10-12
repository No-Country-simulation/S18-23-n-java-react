package com.nocountry.rentify.service;

import com.nocountry.rentify.exception.RoleNotFoundException;
import com.nocountry.rentify.model.entity.Role;
import com.nocountry.rentify.repository.RoleRepository;
import com.nocountry.rentify.service.interfaces.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    @Transactional(readOnly = true)
    public Role getByName(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Role not found: " + roleName));
    }
}