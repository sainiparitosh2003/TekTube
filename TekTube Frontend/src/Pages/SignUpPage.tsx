import { IconArrowLeft, IconDeviceTv } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] bg-gray-500 font-['Poppins'] overflow-hidden relative">
      <Button
        size="sm"
        onClick={() => navigate("/")}
        my="lg"
        color="black"
        variant="light"
        leftSection={<IconArrowLeft size={20} />}
        className="fixed top-4 right-4 z-50 !absolute"
      />
      <div
        className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transform transition-all ease-in-out duration-700 ${
          location.pathname === "/signup"
            ? "-translate-x-1/2"
            : "-translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`w-1/2 h-full transition-all duration-700 ease-in-out ${
            location.pathname === "/signup"
              ? "rounded-r-[200px]"
              : "rounded-l-[200px]"
          } bg-gray-400 flex items-center justify-center flex-col`}
        >
          <div className="flex gap-1 items-center ">
            <IconDeviceTv className="h-16 w-16 stroke={2.5} text-red-500" />
            <div className="text-6xl font-semibold">TekTube</div>
          </div>
          <div className="text-lg text-gray-300 font-semibold">
            Intensive Learning
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};
export default SignUpPage;
