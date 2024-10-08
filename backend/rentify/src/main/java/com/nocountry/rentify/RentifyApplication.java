package com.nocountry.rentify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RentifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentifyApplication.class, args);
	}

}
