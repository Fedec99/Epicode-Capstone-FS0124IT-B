package com.capstone.hodleservice.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.hodleservice.security.entity.Asset;
import com.capstone.hodleservice.security.service.AssetService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/asset")
public class AssetController {

@Autowired AssetService svc;
	
	//GET METHODS
	@GetMapping("/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		Asset a = svc.findById(id);
		ResponseEntity<Asset> resp = new ResponseEntity<Asset>(a, HttpStatus.OK);
		return resp;
	}
	
	@GetMapping("/bywallet/{walletId}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> findByWalletId(@PathVariable Long walletId) {
		List<Asset> l = svc.findByWalletId(walletId);
		ResponseEntity<List<Asset>> resp = new ResponseEntity<List<Asset>>(l, HttpStatus.OK);
		return resp;
	}
	
	//PUT METHODS
	@PutMapping("/updateprice/{assetId}/{newMarketPrice}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> updateMarketPrice(@PathVariable Long assetId,@PathVariable Double newMarketPrice) {
		Asset a = svc.updateMarketPrice(assetId, newMarketPrice);
		ResponseEntity<Asset> resp = new ResponseEntity<Asset>(a, HttpStatus.OK);
		return resp;
	}
	
	//POST METHODS
	@PostMapping("/add")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<?> addAsset(@RequestBody Asset asset) {
	     Asset a = svc.addAsset(asset.getWalletId(), asset.getName(), asset.getTicker(),
	    		 			   asset.getAssetType(), asset.getAssetClass(), asset.getZone(),
	    		 			   asset.getIssuer(), asset.getIntermediary(), asset.getAmount(),
	    		 			   asset.getISIN(), asset.getTax(), asset.getExchange(), 
	    		 			   asset.getMarketPrice(), asset.getAveragePurchasePrice(), asset.getPaidCommission());
	     return new ResponseEntity<Asset>(a, HttpStatus.CREATED);
	}
}
