package com.capstone.hodleservice.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.hodleservice.security.entity.User;
import com.capstone.hodleservice.security.payload.JWTAuthResponse;
import com.capstone.hodleservice.security.payload.LoginDto;
import com.capstone.hodleservice.security.payload.RegisterDto;
import com.capstone.hodleservice.security.service.AuthService;
import com.capstone.hodleservice.security.service.UserService;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
    @Autowired UserService svc;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = {"/login"})
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto){
           	
    	String token = authService.login(loginDto);

    	User u = svc.findByUsername(loginDto.getUsername());
    	
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setUserId(u.getId());
        jwtAuthResponse.setEmail(u.getEmail());
        jwtAuthResponse.setExp(u.getExp());
        jwtAuthResponse.setCurrency(u.getCurrency());
        jwtAuthResponse.setName(u.getName());
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping(value = {"/register"})
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
