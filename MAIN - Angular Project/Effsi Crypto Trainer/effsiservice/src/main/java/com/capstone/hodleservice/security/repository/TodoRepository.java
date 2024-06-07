package com.capstone.hodleservice.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.hodleservice.security.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{
	
	List<Todo> findByUserId(Long userId);
	List<Todo> findByUserIdAndStatus(Long userId, boolean status);

}
