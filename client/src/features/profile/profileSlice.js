import { createSlice } from "@reduxjs/toolkit";
import {
  saveProfileToStorage,
  loadProfileFromStorage,
} from "../../utils/localStorage";

const persisted = loadProfileFromStorage();

const initialState = {
  avatar_url: persisted?.avatar_url || null,
  bio: persisted?.bio || null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.avatar_url = action.payload.avatar_url;
      state.bio = action.payload.bio;
      saveProfileToStorage(state);
    },

    updateProfile(state, action) {
      if (action.payload.avatar_url)
        state.avatar_url = action.payload.avatar_url;
      if (action.payload.bio) state.bio = action.payload.bio;
      saveProfileToStorage(state);
    },

    clearProfile(state) {
      state.avatar_url = null;
      state.bio = null;
      saveProfileToStorage(null);
    },
  },
});

export const { setProfile, updateProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
