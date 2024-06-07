package com.capstone.hodleservice.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.capstone.hodleservice.security.entity.Todo;

@Configuration
public class TodoConfig {

	@Bean("todo")
    @Scope("prototype")
    public Todo todo() {
        return new Todo();
    }
}
