package com.capstone.hodleservice.security.payload;

import com.capstone.hodleservice.security.enumerated.CurrencyOptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JWTAuthResponse {
	private Long userId;
	private String name;
	private String username;
	private String email;
    private CurrencyOptions currency;
	private Double exp;
    private String accessToken;
    private String tokenType = "Bearer";
}
