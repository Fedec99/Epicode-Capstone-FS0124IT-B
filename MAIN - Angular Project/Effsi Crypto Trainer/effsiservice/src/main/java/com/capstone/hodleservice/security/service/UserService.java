package com.capstone.hodleservice.security.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.hodleservice.security.entity.User;
import com.capstone.hodleservice.security.repository.UserRepository;

@Service
public class UserService {

	private Logger log = LoggerFactory.getLogger(UserService.class);
	
	@Autowired UserRepository repo;
	
	//GET METHODS
	public User findById(long id) {
		User u = repo.findById(id).get();
		log.info(u.toString());
		return u;
	}
	
	public User findByEmail(String email) {
		User u = repo.findByEmail(email).get();
		log.info(u.toString());
		return u;
	}
	
	public User findByUsername(String username) {
		User u = repo.findByUsername(username).get();
		log.info(u.toString());
		return u;
	}

	//DELETE METHOD
	public void deleteUser(Long id) {
		repo.deleteById(id);
		log.info("Utente" + id + "eliminato con successo");
	}
}
