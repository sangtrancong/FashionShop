package com.springcloud.auth;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class AuthServiceApplicationTests {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Test
	void contextLoads() {
		String pass = "12345";
		String pass1 = passwordEncoder.encode(pass);

		boolean result = passwordEncoder.matches(pass1, pass);
		Assert.assertTrue(result);
	}

}
