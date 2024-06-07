package com.capstone.hodleservice.security.entity;

import com.capstone.hodleservice.security.enumerated.WalletType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name="wallets")
public class Wallet {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@Column(nullable= false)
	@Enumerated(EnumType.STRING)
	private WalletType walletType;

	@Column(nullable= false)
	private Long userId;
	
	@Column(nullable= false)
	private Double value;
	
}
