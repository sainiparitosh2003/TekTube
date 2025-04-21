package com.tektube.dto;


import com.tektube.entity.Profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
	private Long id;
	private String email;
	private String jobTitle;
	private String company;
	private String location;
	
	public Profile toEnitity() {
		return new Profile(this.id, this.email, this.jobTitle, this.company, this.location);
	}
}
