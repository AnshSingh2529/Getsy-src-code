import { createSlice } from "@reduxjs/toolkit";
import {
  clearAuthFromStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
} from "../../utils/localStorage";

const persisted = loadAuthFromStorage();

const initialState = {
  user: persisted?.user ?? null,
  access: persisted?.access ?? null,
  refresh: persisted?.refresh ?? null,
  isAuthenticated: !!(persisted?.user && persisted?.access),
  status: "idle",
  error: null,
  sessionExpiring: false,
  sessionExpired: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.access = access;
      state.refresh = refresh;
      state.error = null;

      saveAuthToStorage({
        user,
        access,
        refresh,
        isAuthenticated: true,
      });
    },
    updateAccessToken(state, action) {
      state.access = action.payload;
      state.error = null; // ✅ clear errors

      saveAuthToStorage({
        user: state.user,
        access: state.access,
        refresh: state.refresh,
        isAuthenticated: state.isAuthenticated,
      });
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.error = null;

      clearAuthFromStorage();
    },
    setError(state, action) {
      state.error = action.payload;

      saveAuthToStorage(state);
    },
    setSessionExpiring: (state) => {
      state.sessionExpiring = true;
    },
    setSessionExpired: (state) => {
      state.sessionExpired = true;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  logout,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
