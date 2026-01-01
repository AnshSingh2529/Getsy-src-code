import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthFromStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
} from "../../utils/localStorage.js";

export const bootstrapAuth = createAsyncThunk("auth/bootstrap", async () => {
  await new Promise((r) => setTimeout(r, 300));
  const persisted = loadAuthFromStorage();
  if (!persisted?.user || !persisted?.access) {
    return {
      isAuthenticated: false,
      tokenValid: false,
      user: null,
    };
  }
  return {
    isAuthenticated: true,
    user: persisted.user,
    tokenValid: true,
  };
});

const initialState = {
  user: null,
  access: null,
  refresh: null,
  isAuthenticated: false,
  isLoading: true,
  tokenValid: false,
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
      state.tokenValid = true;

      saveAuthToStorage({
        user,
        access,
        refresh,
        isAuthenticated: true,
        tokenValid: true,
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
        tokenValid: state.tokenValid,
      });
    },
    logout(state) {
      Object.assign(state, initialState);
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
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        Object.assign(state, {
          isAuthenticated: action.payload.isAuthenticated ?? false,
          user: action.payload.user ?? null,
          tokenValid: action.payload.tokenValid ?? false,
          isLoading: false,
        });
      });
  },
});

export const { setCredentials, updateAccessToken, logout, setError } =
  authSlice.actions;

export default authSlice.reducer;
