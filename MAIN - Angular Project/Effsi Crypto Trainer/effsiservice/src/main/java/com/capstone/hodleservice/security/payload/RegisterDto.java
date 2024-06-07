package com.capstone.hodleservice.security.payload;

import java.util.Set;

import com.capstone.hodleservice.security.enumerated.CurrencyOptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String name;
    private String username;
    private CurrencyOptions currency;
    private String email;
    private String password;
    private Set<String> roles;
}
