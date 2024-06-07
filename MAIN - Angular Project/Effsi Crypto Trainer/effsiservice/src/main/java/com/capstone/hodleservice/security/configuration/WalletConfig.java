package com.capstone.hodleservice.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.capstone.hodleservice.security.entity.Wallet;

@Configuration
public class WalletConfig {
	
	@Bean("wallet")
    @Scope("prototype")
    public Wallet wallet() {
        return new Wallet();
    }

}
