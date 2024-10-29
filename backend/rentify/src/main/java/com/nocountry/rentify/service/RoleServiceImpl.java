package com.nocountry.rentify.service;

import com.nocountry.rentify.dto.response.RoleRes;
import com.nocountry.rentify.exception.RoleNotFoundException;
import com.nocountry.rentify.model.entity.Role;
import com.nocountry.rentify.repository.RoleRepository;
import com.nocountry.rentify.service.interfaces.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    private static final String ADMIN_ROLE = "ADMIN";


    @Override
    public Role getByName(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseThrow(() -> new RoleNotFoundException("Role not found: " + roleName));
    }

    @Override
    public List<RoleRes> getRoleWithoutAdmin() {
        List<Role> roles = roleRepository.findAllRolesExcept("ADMIN");
        return roles.stream()
                .map(role -> new RoleRes(role.getId(), role.getName()))
                .collect(Collectors.toList());
    }

    public Role findRoleByIdExludeAdmin(Long roleId) {
        return roleRepository.findRoleByIdExcludingRoleName(roleId, ADMIN_ROLE)
                .orElseThrow(() -> new RoleNotFoundException("Role not found"));
    }
}