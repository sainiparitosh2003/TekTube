import { Menu, Avatar } from "@mantine/core";
import { IconUserCircle, IconLogout2 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Slices/UserSlice";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  const handleLogout = () => {
    dispatch(removeUser()); // Remove user from Redux
    navigate("/"); // Redirect to home page
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className="flex cursor-pointer items-center gap-2">
          <div>{user?.name}</div>
          <Avatar src="avatar.png" alt="Profile Avatar" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        <Menu.Divider />
        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
