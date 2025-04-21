import axios from "axios";

const BASE_URL = "http://localhost:8080/profiles/";

interface Profile {
  id: number;
  name: string;
  email: string;
  // Add other fields as required
}

const getProfile = async (id: number): Promise<Profile> => {
  try {
    const response = await axios.get<Profile>(`${BASE_URL}get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

const updateProfile = async (profile: Profile): Promise<Profile> => {
  try {
    const response = await axios.put<Profile>(`${BASE_URL}update`, profile);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export { getProfile, updateProfile };
