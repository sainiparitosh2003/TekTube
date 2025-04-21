package com.tektube.service;


import com.tektube.dto.LoginDTO;
import com.tektube.dto.ResponseDTO;
import com.tektube.dto.UserDTO;
import com.tektube.exception.TekTubeException;



public interface UserService {
	public UserDTO registerUser(UserDTO userDTO) throws TekTubeException;

	public UserDTO loginUser(LoginDTO loginDTO) throws TekTubeException;

	public Boolean sendOtp(String email) throws Exception;

	public Boolean verifyOtp(String email, String otp) throws TekTubeException;

	public ResponseDTO changePassword(LoginDTO loginDTO) throws TekTubeException;
}
