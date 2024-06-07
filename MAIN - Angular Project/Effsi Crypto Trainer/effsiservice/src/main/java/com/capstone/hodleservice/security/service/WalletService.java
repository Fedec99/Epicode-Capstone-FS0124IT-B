package com.capstone.hodleservice.security.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.capstone.hodleservice.security.entity.Asset;
import com.capstone.hodleservice.security.entity.Wallet;
import com.capstone.hodleservice.security.enumerated.WalletType;
import com.capstone.hodleservice.security.repository.WalletRepository;

@Service
public class WalletService {

	private Logger log = LoggerFactory.getLogger(WalletService.class);
	
	@Autowired WalletRepository repo;
	
	@Autowired PointService psvc;
	
	@Autowired @Qualifier("wallet") private ObjectProvider<Wallet> provider;
	
	//POST METHODS
	public Wallet addWallet(WalletType type, Long userId, String name) {

			provider.getObject();
			Wallet w = Wallet.builder()
				    .walletType(type)
				    .name(name)
				    .userId(userId)
					.value(0.00)
					.build();
			repo.save(w);
			System.out.println();
			log.info("Wallet Id: " + w.getId() + " aggiunto correttamente.");
			return w;
			}
	
	//GET METHODS
	public Wallet findById(long id) {
		Wallet w = repo.findById(id).get();
		log.info(w.toString());
		return w;
	}
	
	public List<Wallet> findByUserId(long id) {
		List<Wallet> l = repo.findByUserId(id);
		l.forEach(w -> w.toString());
		return l;
	}
	
	//PUT METHODS
	public Wallet updateValue(Long walletId, List<Asset> l) {
		Double value = 0.00;
		Double limit = 0.00;
		for(Asset a: l) {
			value = value + a.getMarketValue();
			limit = limit + (a.getAmount() * a.getAveragePurchasePrice());
		}
		
		Wallet w = repo.findById(walletId).get();
		w.setValue(value);
		repo.save(w);
		this.psvc.handlePoint(walletId, limit, l);
		return w;
	}
	
	//DELETE METHOD
	public void deleteWallet(Long id) {
		repo.deleteById(id);
		log.info("Wallet" + id + "eliminato con successo");
	}
}
