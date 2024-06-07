package com.capstone.hodleservice.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.hodleservice.security.entity.ERole;
import com.capstone.hodleservice.security.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
