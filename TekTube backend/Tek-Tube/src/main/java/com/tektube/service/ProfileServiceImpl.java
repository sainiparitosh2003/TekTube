package com.tektube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tektube.dto.ProfileDTO;
import com.tektube.entity.Profile;
import com.tektube.exception.TekTubeException;
import com.tektube.repository.ProfileRepository;
import com.tektube.utility.Utilities;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService{

	@Autowired
	private ProfileRepository profileRepository;
	
	@Override
	public Long createProfile(String email) throws TekTubeException {
		Profile profile = new Profile();
		profile.setId(Utilities.getNextSequence("profiles"));;
		profile.setEmail(email);
		profileRepository.save(profile);
		return profile.getId();
	}

	@Override
	public ProfileDTO getProfile(Long id) throws TekTubeException {
		return profileRepository.findById(id).orElseThrow(() -> new TekTubeException("PROFILE_NOT_FPUND")).toDTO();
	}

	@Override
	public ProfileDTO updateProfile(ProfileDTO profileDTO) throws TekTubeException {
		profileRepository.findById(profileDTO.getId()).orElseThrow(() -> new TekTubeException("PROFILE_NOT_FPUND")).toDTO();
		profileRepository.save(profileDTO.toEnitity());
		return profileDTO;
	}

}
