import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch profile from backend
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const response = await axios.get("http://localhost:5000/profile/1"); // Replace with dynamic user ID
  return response.data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    id: null, // Ensure 'id' is defined
    jobTitle: "",
    company: "",
    location: "",
  },
  reducers: {
    changeProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (_state, action) => {
      return action.payload; // Ensure full profile object is set
    });
  },
});

export const { changeProfile } = profileSlice.actions;
export default profileSlice.reducer;
