package com.capstone.hodleservice.security.entity;


import com.capstone.hodleservice.security.enumerated.AssetClass;
import com.capstone.hodleservice.security.enumerated.AssetType;
import com.capstone.hodleservice.security.enumerated.AssetZone;

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
@Table(name="assets")
public class Asset {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable= false)
	private Long walletId;
	
	private String name;
	private String ticker;
	
	@Enumerated(EnumType.STRING)
	private AssetType assetType;
	
	@Enumerated(EnumType.STRING)
	private AssetClass assetClass;
	
	@Enumerated(EnumType.STRING)
	private AssetZone zone;
	
	private String issuer;
	private String intermediary;
	private Double amount;
	
    private String ISIN;
    
    private Double tax;
    private String exchange;
    private Double averagePurchasePrice;
    private Double paidCommission;
    private Double marketPrice;
    private Double marketValue;
    
}
