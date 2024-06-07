package com.capstone.hodleservice.security.service;

import com.capstone.hodleservice.security.entity.Asset;
import com.capstone.hodleservice.security.entity.Point;
import com.capstone.hodleservice.security.repository.PointRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PointService {
	
	private Logger log = LoggerFactory.getLogger(PointService.class);

	@Autowired PointRepository repo;
		
	@Autowired @Qualifier("point") private ObjectProvider<Point> provider;
	
	// POST METHODS
	public Point addPoint(Long walletId, Double limit, List<Asset> assets) {
		provider.getObject();
		Point p = Point.builder()
				  .date(LocalDate.now())
				  .walletId(walletId)
				  .invested(limit)
				  .assets(assets)
				  .build();
		repo.save(p);
		log.info("New Point saved for wallet Id: " + walletId);
		return p;
	}
	
	public Point generatePoint(Point point) {
		provider.getObject();
		Point p = Point.builder()
				  .date(point.getDate())
				  .walletId(point.getWalletId())
				  .invested(point.getInvested())
				  .assets(point.getAssets())
				  .value(point.getValue())
				  .high(point.getHigh())
				  .low(point.getLow())
				  .build();
		repo.save(p);
		log.info("Point generated for wallet Id: " + point.getWalletId());
		return p;
	}
	
	// GET METHODS
	public Point findById(long id) {
		Point p = repo.findById(id).get();
		log.info(p.toString());
		return p;
	}
	
	public List<Point> findByWalletId(Long walletId) {
		List<Point> l = repo.findByWalletId(walletId);
		return l;
	}
	
	public Point findByWalletIdAndDate(Long walletId, LocalDate date) {
		Point p = repo.findByWalletIdAndDate(walletId, date);
		log.info(p.toString());
		return p;
	}
	
	public boolean existsByWalletAndDate(Long walletId, LocalDate date) {
		return repo.existsByWalletIdAndDate(walletId, date);
	}
	
	// PUT METHODS
	public Point completePoint(Long pointId, Double value, Double high, Double low) {
		Point p = repo.findById(pointId).get();
		p.setValue(value);
		p.setHigh(high);
		p.setLow(low);
		repo.save(p);
		return p;
	}
	
	// OTHER METHODS
	public Point handlePoint(Long walletId, Double limit, List<Asset> assets) {
		
		LocalDate today = LocalDate.now();
		boolean exist = repo.existsByWalletIdAndDate(walletId, today);
		
		if(exist) {
			Point p = repo.findByWalletIdAndDate(walletId, today);
			p.setAssets(assets);
			p.setInvested(limit);
			repo.save(p);
			log.info("Point updated correctly");
			return p;
		}else {
			Point p = this.addPoint(walletId, limit, assets);
			return p;
			
		}
		
	}
}
