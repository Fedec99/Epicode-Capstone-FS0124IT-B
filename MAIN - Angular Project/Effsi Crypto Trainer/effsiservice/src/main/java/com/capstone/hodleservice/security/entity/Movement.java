package com.capstone.hodleservice.security.entity;

import com.capstone.hodleservice.security.enumerated.MovementType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name="movements")
public class Movement {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private MovementType movementType;
	
	@Column(nullable= false)
	private Long userId;
	
	private Long number; 
	
	private Long startingWalletId;
	private Long endingWalletId;
	
	private Long startingAssetId;
	private Long endingAssetId;
	
	private Double startingAssetAmmount;
	private Double endingAssetAmmount;
	
	private Double purchasePrice;
	
	private LocalDate date;

}
