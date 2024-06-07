package com.capstone.hodleservice.security.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name="points")
public class Point {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable= false)
	private Long walletId;
	
	@ManyToMany
	private List<Asset> assets;
	
	private LocalDate date;
	private Double invested;
	private Double value;
	private Double high;
	private Double low;
}
