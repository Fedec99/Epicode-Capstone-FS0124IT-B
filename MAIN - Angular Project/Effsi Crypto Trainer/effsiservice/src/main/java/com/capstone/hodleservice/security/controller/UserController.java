package com.capstone.hodleservice.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.hodleservice.security.entity.User;
import com.capstone.hodleservice.security.service.UserService;

@RestController
@CrossOrigin(origins="*", maxAge = 3600)
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired UserService svc;

	//GET METHODS
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		User u = svc.findById(id);
		ResponseEntity<User> resp = new ResponseEntity<User>(u, HttpStatus.OK);
		return resp;
	}
	
	@GetMapping("/byemail/{email}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findByEmail(@PathVariable String email) {
		User u = svc.findByEmail(email);
		ResponseEntity<User> resp = new ResponseEntity<User>(u, HttpStatus.OK);
		return resp;
	}
	
	@GetMapping("/byusername/{username}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findByUsername(@PathVariable String username) {
		User u = svc.findByEmail(username);
		ResponseEntity<User> resp = new ResponseEntity<User>(u, HttpStatus.OK);
		return resp;
	}
}
