import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [otpSent, setotpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(6);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true); // Set loading state before making the request
    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("OTP Sent Successfully", "Enter OTP to reset.");
        setotpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "OTP Sending Failed",
          err.response?.data?.errorMessage ||
            "Something went wrong. Please try again."
        );
      })
      .finally(() => {
        setOtpSending(false); // Ensure loading stops after request completion
      });
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP Verified", "Enter new password.");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "OTP Verification Failed",
          err.response.data.errorMessage
        );
      });
  };

  const resendOtp = () => {
    if(resendLoader)return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setotpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };

  const handleResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with new password");
        props.close();
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Password reset failed",
          err.response.data.errorMessage
        );
      });
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6">
        <TextInput
          withAsterisk
          value={email}
          name="email"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Your email"
          leftSection={<IconAt size={16} />}
          rightSection={
            <Button
              loading={otpSending && !otpSent}
              autoContrast
              variant="filled"
              disabled={email === "" || otpSent}
              color="red"
              onClick={handleSendOtp}
              size="xs"
              className="mr-1"
            >
              Send otp
            </Button>
          }
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            onComplete={handleVerifyOtp}
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            type="number"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              fullWidth
              loading={otpSending}
              autoContrast
              variant="light"
              color="red"
              onClick={resendOtp}
            >
              {resendLoader ? seconds : "Resend"}
            </Button>
            <Button
              fullWidth
              autoContrast
              variant="filled"
              color="red"
              onClick={changeEmail}
            >
              Change Email
            </Button>
          </div>
        )}
        {verified && (
          <PasswordInput
            withAsterisk
            value={password}
            error={passErr}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr(signupValidation("password", e.target.value));
            }}
            label="Password"
            placeholder="Enter your password"
            leftSection={<IconLock size={16} stroke={1.5} />}
          />
        )}
        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
