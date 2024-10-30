package com.nocountry.rentify.controller;

import com.nocountry.rentify.dto.ApiResponse;
import com.nocountry.rentify.dto.response.RoleRes;
import com.nocountry.rentify.service.interfaces.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("${api.base}/role")
@Tag(name="Roles")
@RequiredArgsConstructor
@RestController
public class RoleController {

    private final RoleService roleService;

    @Operation(summary = "Get available roles (excluding ADMIN)", description = "Fetches a list of all roles that can be assigned to users, excluding the 'ADMIN' role. This endpoint is useful for user management and role assignment.")
    @GetMapping
    public ResponseEntity getRoles(){
        List<RoleRes> response = roleService.getRoleWithoutAdmin();
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}
