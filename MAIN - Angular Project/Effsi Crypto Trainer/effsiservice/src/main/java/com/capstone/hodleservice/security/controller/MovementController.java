package com.capstone.hodleservice.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.hodleservice.security.entity.Asset;
import com.capstone.hodleservice.security.entity.Movement;
import com.capstone.hodleservice.security.service.MovementService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/movement")
public class MovementController {
	
	@Autowired MovementService svc;
	
	//GET METHODS
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		Movement m = svc.findById(id);
		ResponseEntity<Movement> resp = new ResponseEntity<Movement>(m, HttpStatus.OK);
		return resp;
	}
	
	@GetMapping("/byuser/{userId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findByUserId(@PathVariable Long userId) {
		List<Movement> l = svc.findByUserId(userId);
		ResponseEntity<List<Movement>> resp = new ResponseEntity<List<Movement>>(l, HttpStatus.OK);
		return resp;
	}
	
	@GetMapping("/bywallet/{walletId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findByWalletId(@PathVariable Long walletId) {
		List<Movement> l = svc.findByWalletId(walletId);
		ResponseEntity<List<Movement>> resp = new ResponseEntity<List<Movement>>(l, HttpStatus.OK);
		return resp;
	}
	
	//POST METHODS
	@PostMapping("/incoming/{userId}/{walletId}/{assetId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> addIncoming(@PathVariable Long userId,@PathVariable Long walletId,
										 @PathVariable Long assetId,@RequestBody Double assetAmmount) {
		Movement m = svc.addIncoming(userId, walletId, assetId, assetAmmount);
	    return new ResponseEntity<Movement>(m, HttpStatus.CREATED);
	}
	
	@PostMapping("/outgoing/{userId}/{walletId}/{assetId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> addOutgoing(@PathVariable Long userId,@PathVariable Long walletId,
										 @PathVariable Long assetId,@RequestBody Double assetAmmount) {
		Movement m = svc.addOutgoing(userId, walletId, assetId, assetAmmount);
	    return new ResponseEntity<Movement>(m, HttpStatus.CREATED);
	}
	
	@PostMapping("/transfer/{userId}/{startingWalletId}/{endingWalletId}/{assetId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> addTransfer(@PathVariable Long userId, @PathVariable Long startingWalletId, 
										 @PathVariable Long endingWalletId, @PathVariable  Long assetId, 
										 @RequestBody  Double assetAmmount) {
		Movement m = svc.addTransfer(userId, startingWalletId, endingWalletId , assetId, assetAmmount);
	    return new ResponseEntity<Movement>(m, HttpStatus.CREATED);
	}
	
	@PostMapping("/convert/{userId}/{walletId}/{startingAssetId}/{startingAssetAmmount}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> addConvert(@PathVariable Long userId, @PathVariable Long walletId, 
										@PathVariable Long startingAssetId, @RequestBody Asset endingAsset,
										@PathVariable Double startingAssetAmmount) {
		Movement m = svc.addConvert(userId, walletId, startingAssetId , endingAsset, startingAssetAmmount);
	    return new ResponseEntity<Movement>(m, HttpStatus.CREATED);
	}
	
}
