package com.tektube.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tektube.dto.LoginDTO;
import com.tektube.dto.ResponseDTO;
import com.tektube.dto.UserDTO;
import com.tektube.entity.OTP;
import com.tektube.entity.User;
import com.tektube.exception.TekTubeException;
import com.tektube.repository.OTPRepository;
import com.tektube.repository.UserRepository;
import com.tektube.utility.Data;
import com.tektube.utility.Utilities;

import jakarta.mail.internet.MimeMessage;

@Service(value="userService")
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OTPRepository otpRepository;
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JavaMailSender mailSender;

	@Override
	public UserDTO registerUser(UserDTO userDTO) throws TekTubeException {
		Optional<User> optional = userRepository.findByEmail(userDTO.getEmail());
		if(optional.isPresent()) throw new TekTubeException("USER_FOUND");
		userDTO.setProfileId(profileService.createProfile(userDTO.getEmail()));
		userDTO.setId(Utilities.getNextSequence("users"));
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		User user = userDTO.toEntity();
		user=userRepository.save(user);
		return user.toDTO();
	}

	@Override
	public UserDTO loginUser(LoginDTO loginDTO) throws TekTubeException {
	    User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new TekTubeException("USER_NOT_FOUND"));
	    if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {throw new TekTubeException("INVALID_CREDENTIALS");}
	    return user.toDTO();
	}

	@Override
	public Boolean sendOtp(String email) throws Exception {
		userRepository.findByEmail(email).orElseThrow(() -> new TekTubeException("USER_NOT_FOUND"));
		MimeMessage mm = mailSender.createMimeMessage();
		MimeMessageHelper message = new MimeMessageHelper(mm, true);
		message.setTo(email);
		message.setSubject("Your OTP Code");
		String genOtp = Utilities.generateOTP();
		OTP otp = new OTP(email, genOtp, LocalDateTime.now());
		otpRepository.save(otp);
		message.setText(Data.getMessgaeBody(genOtp), true);
		mailSender.send(mm);
		return true;
		
		
	}

	@Override
	public Boolean verifyOtp(String email, String otp) throws TekTubeException {
		OTP otpEntity = otpRepository.findById(email).orElseThrow(() -> new TekTubeException("OTP_NOT_FOUND"));
		if(!otpEntity.getOtpCode().equals(otp))throw new TekTubeException("OTP_INCORRECT");
		return true;
	}

	@Override
	public ResponseDTO changePassword(LoginDTO loginDTO) throws TekTubeException {
		User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new TekTubeException("USER_NOT_FOUND"));
		user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
		userRepository .save(user);
		return new ResponseDTO("Password changed successfully");
	}
	
	@Scheduled(fixedRate=60000)
	public void removeExpiredOTPs() {
		LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
		List<OTP> expiredOTPs=otpRepository.findByCreationTimeBefore(expiry);
		if(!expiredOTPs.isEmpty()) {
			otpRepository.deleteAll(expiredOTPs);
			System.out.println("Removed " + expiredOTPs.size() + " expired OTPs. ");
		}
	}


}
