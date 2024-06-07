package com.capstone.hodleservice.security.controller;

import com.capstone.hodleservice.security.entity.Wallet;
import com.capstone.hodleservice.security.enumerated.WalletType;
import com.capstone.hodleservice.security.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*", maxAge = 3600)
@RequestMapping("/api/wallet")
public class WalletController {

	@Autowired WalletService svc;
	
	//GET METHODS
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		Wallet w = svc.findById(id);
		ResponseEntity<Wallet> resp = new ResponseEntity<Wallet>(w, HttpStatus.OK);
		return resp;
	}
	
	@GetMapping("/byuser/{userId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findByUserId(@PathVariable Long userId) {
		List<Wallet> l = svc.findByUserId(userId);
		ResponseEntity<List<Wallet>> resp = new ResponseEntity<List<Wallet>> (l, HttpStatus.OK);
		return resp;
	}
	
	//POST METHODS
	@PostMapping("/add/{userId}/{type}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addWallet(@PathVariable Long userId, @PathVariable WalletType type, 
    									@RequestBody String name) {
        Wallet w = svc.addWallet(type, userId, name);
        return new ResponseEntity<Wallet>(w, HttpStatus.CREATED);
    }
	
}
