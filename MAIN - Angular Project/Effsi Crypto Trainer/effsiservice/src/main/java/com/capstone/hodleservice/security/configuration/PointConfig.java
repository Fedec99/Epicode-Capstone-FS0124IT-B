package com.capstone.hodleservice.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.capstone.hodleservice.security.entity.Point;

@Configuration
public class PointConfig {

	@Bean("point")
    @Scope("prototype")
    public Point point() {
        return new Point();
    }
}
