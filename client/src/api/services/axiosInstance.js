import axios from "axios";
import store from "../../store/store.js";
import { updateAccessToken, logout } from "../../features/auth/authSlice.js";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token on 401
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refresh = store.getState().auth.refresh;

        const res = await axios.post(
          `${axiosInstance.defaults.baseURL}token/refresh/`,
          { refresh }
        );

        const newAccess = res.data.access;

        // update redux state
        store.dispatch(updateAccessToken(newAccess));

        // update header for retry
        original.headers.Authorization = `Bearer ${newAccess}`;

        // RETRY FIXED
        return axiosInstance(original);
      } catch (refreshErr) {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
