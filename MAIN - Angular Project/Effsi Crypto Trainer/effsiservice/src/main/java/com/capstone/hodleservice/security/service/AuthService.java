package com.capstone.hodleservice.security.service;

import com.capstone.hodleservice.security.payload.LoginDto;
import com.capstone.hodleservice.security.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
