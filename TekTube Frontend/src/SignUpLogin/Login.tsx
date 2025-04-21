import { Button, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { setUser } from "../Slices/UserSlice";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      loginUser(data)
        .then((res) => {
          console.log(res);
          successNotification(
            "Login Successful",
            "Redirection to home page..."
          );
          setTimeout(() => {
            dispatch(setUser(res));
            navigate("/explore");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Login Failed",
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
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'red', type: 'bars' }}
        />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login</div>

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

        <Button
          autoContrast
          variant="filled"
          color="red"
          onClick={handleSubmit}
          loading={loading}
        >
          Login
        </Button>
        <div className="mx-auto">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-400 hover:underline">
            SignUp
          </Link>
          <div
            onClick={open}
            className="text-red-400 hover:underline cursor-pointer text-center"
          >
            Forgrt Password?
          </div>
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />;
    </>
  );
};
export default Login;
