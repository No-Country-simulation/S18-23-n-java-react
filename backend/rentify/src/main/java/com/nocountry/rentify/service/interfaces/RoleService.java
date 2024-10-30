package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.dto.response.RoleRes;
import com.nocountry.rentify.model.entity.Role;
import java.util.List;

public interface RoleService {

    /**
     * Retrieves a role by its name.
     *
     * @param name the name of the role to retrieve (e.g., "USER", "ADMIN").
     * @return the {@link Role} entity associated with the specified name.
     */
    Role getByName(String name);

    /**
     * Retrieves all roles except the "ADMIN" role.
     *
     * This method is useful for listing roles that are not related to administrative users,
     * providing a filtered set of roles in the system.
     *
     * @return a list of {@link RoleRes} objects, excluding the "ADMIN" role.
     */
    List<RoleRes> getRoleWithoutAdmin();

    /**
     * Finds a role by its ID while excluding the "ADMIN" role.
     *
     * This method can be used to prevent granting administrative privileges unintentionally
     * when managing roles by their ID. If the role ID corresponds to "ADMIN", it will not be returned.
     *
     * @param roleId the ID of the role to find.
     * @return the {@link Role} entity corresponding to the specified ID, excluding "ADMIN".
     */
    Role findRoleByIdExludeAdmin(Long roleId);
}
