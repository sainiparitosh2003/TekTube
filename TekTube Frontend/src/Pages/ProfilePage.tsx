import { Divider } from "@mantine/core";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-500 font-['Poppins'] flex flex-col items-center">
      <Header />
      <Divider mx="md" mb="md" /> {/* Reduced bottom margin */}
      <Profile />
    </div>
  );
};

export default ProfilePage;
