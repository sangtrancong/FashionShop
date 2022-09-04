package com.springcloud.auth.service;

import com.springcloud.auth.model.entity.Account;
import com.springcloud.auth.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service(value = "userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String input) {
		Optional<Account> user = null;

		if (input.contains("@"))
			user = accountRepository.findByEmail(input);
		else
			user = accountRepository.findByUsername(input);

		if (!user.isPresent())
			throw new BadCredentialsException("Bad credentials");

		new AccountStatusUserDetailsChecker().check(user.get());

		return user.get();
	}

}
