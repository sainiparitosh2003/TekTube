import {
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
  rem,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [event.target.name]: event.target.value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      if (data.confirmPassword !== value) {
        setFormError({
          ...formError,
          confirmPassword: "Passwords do not match.",
        });
      } else {
        setFormError({ ...formError, confirmPassword: "" });
        setFormError({ ...formError, [name]: signupValidation(name, value) });
      }
    }
    if (name === "confirmPassword") {
      if (data.password !== value)
        setFormError({ ...formError, [name]: "Passwords do not match." });
      else setFormError({ ...formError, confirmPassword: "" });
    }
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match. ";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid == true) {
      setLoading(true);
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to Login page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
          });
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Registration Failed",
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
          });
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "red", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>

        <TextInput
          withAsterisk
          value={data.name}
          error={formError.name}
          name="name"
          onChange={handleChange}
          label="Full Name"
          placeholder="Your name"
        />

        <TextInput
          withAsterisk
          value={data.email}
          error={formError.email}
          name="email"
          onChange={handleChange}
          label="Email"
          placeholder="Your email"
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        />

        <PasswordInput
          withAsterisk
          value={data.password}
          error={formError.password}
          name="password"
          onChange={handleChange}
          label="Password"
          placeholder="Enter your password"
          leftSection={
            <IconLock
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
        />

        <PasswordInput
          withAsterisk
          value={data.confirmPassword}
          error={formError.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          label="Confirm Password"
          placeholder="Confirm password"
          leftSection={
            <IconLock
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
        />

        <Button
          loading={loading}
          autoContrast
          variant="filled"
          color="red"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <div className="mx-auto">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-red-400 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/login"), setFormError(form), setData(form);
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
