package com.capstone.hodleservice.security.controller;

import com.capstone.hodleservice.security.entity.Point;
import com.capstone.hodleservice.security.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/point")
public class PointController {
	
	@Autowired PointService svc;
	
		//GET METHODS
		@GetMapping("/{id}")
		@PreAuthorize("isAuthenticated()")
		public ResponseEntity<?> findById(@PathVariable Long id) {
			Point p = svc.findById(id);
			ResponseEntity<Point> resp = new ResponseEntity<Point>(p, HttpStatus.OK);
			return resp;
		}
		
		@GetMapping("/bywallet/{walletId}")
		@PreAuthorize("isAuthenticated()")
		public ResponseEntity<?> findByWalletId(@PathVariable Long walletId) {
			List<Point> l = svc.findByWalletId(walletId);
			ResponseEntity<List<Point>> resp = new ResponseEntity<List<Point>>(l, HttpStatus.OK);
			return resp;
		}

		@GetMapping("/bydate/{walletId}/{date}")
		@PreAuthorize("isAuthenticated()")
		public ResponseEntity<?> findByWalletIdAndDate(@PathVariable Long walletId, @PathVariable LocalDate date) {
			Point p = svc.findByWalletIdAndDate(walletId, date);
			ResponseEntity<Point> resp = new ResponseEntity<Point>(p, HttpStatus.OK);
			return resp;
		}
		
		@GetMapping("/exist/{walletId}/{date}")
		@PreAuthorize("isAuthenticated()")
		public ResponseEntity<?> existByWalletIdAndDate(@PathVariable Long walletId, @PathVariable LocalDate date) {
			Boolean e = (Boolean)svc.existsByWalletAndDate(walletId, date);
			ResponseEntity<Boolean> resp = new ResponseEntity<Boolean>(e, HttpStatus.OK);
			return resp;
		}
		
		//POST METHODS
		@PostMapping("/add")
	    @PreAuthorize("isAuthenticated()")
	    public ResponseEntity<?> addPoint(@RequestBody Point point) {
	        Point p = svc.generatePoint(point);
	        return new ResponseEntity<Point>(p, HttpStatus.CREATED);
	    }
		
		//PUT METHODS
		@PutMapping("/complete/{pointId}/{value}/{high}/{low}")
		@PreAuthorize("isAuthenticated()")
		public ResponseEntity<?> completePoint(@PathVariable Long pointId, @PathVariable Double value, @PathVariable Double high, @PathVariable Double low) {
			Point a = svc.completePoint(pointId, value, high, low);
			ResponseEntity<Point> resp = new ResponseEntity<Point>(a, HttpStatus.OK);
			return resp;
		}
}
