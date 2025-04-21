package com.tektube.service;

import com.tektube.dto.ProfileDTO;
import com.tektube.exception.TekTubeException;

public interface ProfileService {
	public Long createProfile(String email) throws TekTubeException;
	public ProfileDTO getProfile(Long id) throws TekTubeException;
	public ProfileDTO updateProfile(ProfileDTO profileDTO) throws TekTubeException;
	
}
