package com.tektube;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TekTubeApplication {

	public static void main(String[] args) {
		SpringApplication.run(TekTubeApplication.class, args);
	}

}
