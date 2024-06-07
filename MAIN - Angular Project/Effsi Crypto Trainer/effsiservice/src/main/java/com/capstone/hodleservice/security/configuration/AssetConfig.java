package com.capstone.hodleservice.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.capstone.hodleservice.security.entity.Asset;

@Configuration
public class AssetConfig {

	@Bean("asset")
    @Scope("prototype")
    public Asset asset() {
        return new Asset();
    }
	
}
