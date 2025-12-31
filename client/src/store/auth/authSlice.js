import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthFromStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
} from "../../utils/localStorage.js";

const persisted = loadAuthFromStorage();

export const bootstrapAuth = createAsyncThunk("auth/bootstrap", async () => {
  await new Promise((r) => setTimeout(r, 800));

  const user = persisted.getItem("user");
  const token = persisted.getItem("access", "refresh");

  if (!user || !token) {
    return { isAuthenticated: false };
  }

  const tokenValid = token === "valid-token";

  return {
    isAuthenticated: tokenValid,
    user: tokenValid ? user : null,
    tokenValid,
  };
});

const initialState = {
  user: persisted?.user ?? null,
  access: persisted?.access ?? null,
  refresh: persisted?.refresh ?? null,
  isAuthenticated: !!(persisted?.user && persisted?.access),
  status: "idle",
  error: null,
  sessionExpiring: false,
  sessionExpired: false,
  isLoading: true,
  tokenValid: true,
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
        tokenValid,
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
      state.user = null;
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.error = null;
      state.tokenValid = true;

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
    extraReducers: (builder) => {
      builder
        .addCase(bootstrapAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(bootstrapAuth.fulfilled, (state, action) => {
          Object.assign(state, {
            isAuthenticated: action.payload.isAuthenticated ?? false,
            user: action.payload.user ?? null,
            tokenValid: action.payload.tokenValid ?? true,
            isLoading: false,
          });
        });
    },
  },
});

export const { setCredentials, updateAccessToken, logout, setError } =
  authSlice.actions;

export default authSlice.reducer;
