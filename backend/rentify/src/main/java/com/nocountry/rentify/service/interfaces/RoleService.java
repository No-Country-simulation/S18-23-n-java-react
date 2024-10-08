package com.nocountry.rentify.service.interfaces;

import com.nocountry.rentify.model.entity.Role;

public interface RoleService {

    /**
     * Retrieves a role by its name.
     *
     * @param name the name of the role to retrieve (e.g., "USER", "ADMIN")
     * @return the {@link Role} entity associated with the specified name
     */
    Role getByName(String name);

}
