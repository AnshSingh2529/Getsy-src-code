import {
  setSessionExpiring,
  setSessionExpired,
} from "../features/auth/authSlice.js";

export const startSessionTimer = (exp, dispatch) => {
  const expiresInMs = exp * 1000 - Date.now();
  const warnAt = expiresInMs - 60_000; // warn 1 min before

  setTimeout(() => {
    dispatch(setSessionExpiring());
  }, warnAt);

  setTimeout(() => {
    dispatch(setSessionExpired());
  }, expiresInMs);
};
