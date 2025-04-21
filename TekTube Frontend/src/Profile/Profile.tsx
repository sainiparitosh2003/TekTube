import { ActionIcon } from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification, errorNotification } from "../Services/NotificationService";
import { getProfile, updateProfile } from "../Services/ProfileService"; // Import API functions

const Profile = () => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getProfile(user.id)
        .then((data) => {
          dispatch(changeProfile(data)); // Update Redux state
        })
        .catch((error) => console.error("Failed to fetch profile:", error));
    }
  }, [user?.id, dispatch]);

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "" },
  });

  const handleClick = async () => {
    if (!edit) {
      // Start editing: Load existing values into the form
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
      });
    } else {
      // Save changes: Send updated data to the backend
      setEdit(false);
      let updatedProfile = { ...profile, ...form.getValues() };

      try {
        const response = await updateProfile(updatedProfile);
        dispatch(changeProfile(response)); // Update Redux with new profile
        successNotification("Success", "Profile Updated Successfully");
      } catch (error) {
        errorNotification("Error", "Failed to update profile");
        console.error("Update profile error:", error);
      }
    }
  };


  return (
    <div className="flex justify-center mt-12">
      <div className="relative w-2/3 bg-white shadow-lg rounded-2xl p-6">
        <div className="relative">
          <img className="rounded-t-2xl w-full" src="banner.png" alt="Banner" />

          {/* Profile Avatar */}
          <div className="absolute left-6 -bottom-12">
            <img
              className="w-32 h-32 border-4 border-white rounded-full shadow-md"
              src="/avatar.png"
              alt="Profile Avatar"
            />
          </div>
        </div>

        <div className="px-3 mt-16">
          <div className="text-3xl font-semibold flex justify-between">
            {user.name}
            <ActionIcon
              onClick={handleClick}
              size="lg"
              color="red"
              variant="subtle"
            >
              {edit ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
          {edit ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="jobTitle" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
              </div>
              <SelectInput form={form} name="location" {...select[2]} />
            </div>
          ) : (
            <>
              <div className="text-xl flex gap-1 items-center">
                <IconBriefcase className="h-5 w-5" />
                {profile.jobTitle} • {profile.company}
              </div>
              <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                <IconMapPin className="h-5 w-5" stroke={1.5} />{" "}
                {profile.location}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
