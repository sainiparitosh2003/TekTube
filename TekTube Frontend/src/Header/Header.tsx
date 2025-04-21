import { IconDeviceTv } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

const Header = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <div className="w-full bg-black px-6 text-white h-20 flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <IconDeviceTv className="h-11 w-11 stroke={2.5} text-red-500" />
        <div className="text-3xl font-semibold">TekTube</div>
      </div>
      {NavLinks()}
      <div className="flex gap-5 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="red">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
