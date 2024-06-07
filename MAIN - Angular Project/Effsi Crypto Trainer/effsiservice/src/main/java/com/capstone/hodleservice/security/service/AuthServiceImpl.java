package com.capstone.hodleservice.security.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capstone.hodleservice.security.entity.ERole;
import com.capstone.hodleservice.security.entity.Role;
import com.capstone.hodleservice.security.entity.User;
import com.capstone.hodleservice.security.exception.MyAPIException;
import com.capstone.hodleservice.security.payload.LoginDto;
import com.capstone.hodleservice.security.payload.RegisterDto;
import com.capstone.hodleservice.security.repository.RoleRepository;
import com.capstone.hodleservice.security.repository.UserRepository;
import com.capstone.hodleservice.security.security.JwtTokenProvider;



@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {
        
    	Authentication authentication = authenticationManager.authenticate(
        		new UsernamePasswordAuthenticationToken(
        				loginDto.getUsername(), loginDto.getPassword()
        		)
        ); 
    	
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {

        //check if username exists in database
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username is already exists!.");
        }

        //check if email exists in database
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email is already exists!.");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setExp(0.00);
        user.setCurrency(registerDto.getCurrency());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        
        if(registerDto.getRoles() != null) {
	        registerDto.getRoles().forEach(role -> {
	        	Role userRole = roleRepository.findByRoleName(getRole(role)).get();
	        	roles.add(userRole);
	        });
        } else {
        	Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).get();
        	roles.add(userRole);
        }
        
        user.setRoles(roles);
        System.out.println(user);
        userRepository.save(user);

        return "User registered successfully!.";
    }
    
    public ERole getRole(String role) {
    	if(role.equals("ADMIN")) return ERole.ROLE_ADMIN;
    	else if(role.equals("MODERATOR")) return ERole.ROLE_MODERATOR;
    	else return ERole.ROLE_USER;
    }
    
}
