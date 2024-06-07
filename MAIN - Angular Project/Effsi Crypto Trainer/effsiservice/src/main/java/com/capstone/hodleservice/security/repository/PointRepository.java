package com.capstone.hodleservice.security.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.hodleservice.security.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long>{
	boolean existsByWalletIdAndDate(Long walletId,LocalDate date);
	List<Point> findByWalletId(Long walletId);
	Point findByWalletIdAndDate(Long walletId, LocalDate date);
}
