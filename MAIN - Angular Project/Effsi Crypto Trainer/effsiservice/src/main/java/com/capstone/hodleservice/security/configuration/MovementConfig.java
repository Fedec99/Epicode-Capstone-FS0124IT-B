package com.capstone.hodleservice.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.capstone.hodleservice.security.entity.Movement;

@Configuration
public class MovementConfig {

	@Bean("movement")
    @Scope("prototype")
    public Movement movement() {
        return new Movement();
    }
	
}
