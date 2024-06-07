package com.capstone.hodleservice.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.hodleservice.security.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long>{
	
	List<Wallet> findByUserId(Long userId);
}
