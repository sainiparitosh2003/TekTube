package com.tektube.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.tektube.dto.ProfileDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="profiles")
public class Profile {
	@Id
	private Long id;
	private String email;
	private String jobTitle;
	private String company;
	private String location;
	
	public ProfileDTO toDTO() {
		return new ProfileDTO(this.id, this.email, this.jobTitle, this.company, this.location);
	}
}
