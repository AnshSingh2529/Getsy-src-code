import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  logout as logoutAction,
  setCredentials,
} from "../../features/auth/authSlice";

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1/";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Interceptor-like wrapper
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Token expired
  if (result?.error?.status === 401) {
    const refresh = api.getState().auth.refresh;

    if (!refresh) {
      api.dispatch(logoutAction());
      return result;
    }

    // Try refreshing
    const refreshResult = await baseQuery(
      {
        url: "/token/refresh/",
        method: "POST",
        body: { refresh },
      },
      api,
      extraOptions
    );

    // If refresh worked, retry original query
    if (refreshResult?.data) {
      const { access, refresh: newRefresh } = refreshResult.data;

      api.dispatch(
        setCredentials({
          user: api.getState().auth.user,
          access,
          refresh: newRefresh || refresh,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutAction());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register/",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: (refresh) => ({
        url: "/logout/",
        method: "POST",
        body: { refresh },
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/profile/change-password/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
