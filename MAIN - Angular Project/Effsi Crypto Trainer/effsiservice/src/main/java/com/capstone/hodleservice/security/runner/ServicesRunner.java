package com.capstone.hodleservice.security.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.capstone.hodleservice.security.service.AssetService;
import com.capstone.hodleservice.security.service.MovementService;
import com.capstone.hodleservice.security.service.TodoService;
import com.capstone.hodleservice.security.service.UserService;
import com.capstone.hodleservice.security.service.WalletService;

@Component
public class ServicesRunner implements ApplicationRunner {

	@Autowired UserService uSvc;
	@Autowired WalletService wSvc;
	@Autowired AssetService aSvc;
	@Autowired TodoService tSvc;
	@Autowired MovementService mSvc;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		
	}

}
