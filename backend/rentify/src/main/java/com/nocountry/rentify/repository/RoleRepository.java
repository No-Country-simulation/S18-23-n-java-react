package com.nocountry.rentify.repository;

import com.nocountry.rentify.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

    @Query("SELECT r FROM Role r WHERE r.id = :roleId AND r.name != :roleName")
    Optional<Role> findRoleByIdExcludingRoleName(@Param("roleId") Long roleId, @Param("roleName") String roleName);

    @Query("SELECT r FROM Role r WHERE r.name != :excludedRole")
    List<Role> findAllRolesExcept(@Param("excludedRole") String excludedRole);

}
