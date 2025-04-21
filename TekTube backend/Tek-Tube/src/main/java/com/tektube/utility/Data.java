package com.tektube.utility;

public class Data {
	public static String getMessgaeBody(String otpCode) {
	    return "<!DOCTYPE html>\n" +
	           "<html>\n" +
	           "<head>\n" +
	           "<meta charset='UTF-8'>\n" +
	           "<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n" +
	           "<title>OTP Verification</title>\n" +
	           "<style>\n" +
	           "body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px; }\n" +
	           ".container { max-width: 500px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; " +
	           "box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }\n" +
	           ".otp { font-size: 24px; font-weight: bold; color: #333; }\n" +
	           ".footer { margin-top: 20px; font-size: 14px; color: #666; }\n" +
	           "</style>\n" +
	           "</head>\n" +
	           "<body>\n" +
	           "<div class='container'>\n" +
	           "<h2>Email Verification</h2>\n" +
	           "<p>Your One-Time Password (OTP) for verification is:</p>\n" +
	           "<p class='otp'>" + otpCode + "</p>\n" +
	           "<p>Please use this OTP to complete your verification process. The OTP is valid for 5 minutes.</p>\n" +
	           "<div class='footer'>\n" +
	           "<p>If you did not request this code, please ignore this email.</p>\n" +
	           "<p>Best Regards,<br>TeknoSpire</p>\n" +
	           "</div>\n" +
	           "</div>\n" +
	           "</body>\n" +
	           "</html>";
	}

}
