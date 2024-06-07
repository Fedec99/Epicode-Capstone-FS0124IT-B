package com.capstone.hodleservice.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.hodleservice.security.entity.Movement;

public interface MovementRepository extends JpaRepository<Movement, Long>{

	List<Movement> findByUserId(Long userId);
	
	List<Movement> findByEndingWalletIdAndEndingAssetId(Long endingWalletId, Long endingAssetId);
	
	List<Movement> findByEndingWalletId (Long endingWalletId);
}
