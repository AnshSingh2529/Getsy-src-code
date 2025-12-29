import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // Only react to 401 (unauthorized)
  if (result?.error?.status === 401) {
    const refresh = api.getState().auth.refresh;

    if (!refresh) {
      api.dispatch(logout());
      return result;
    }

    // IMPORTANT: refresh request must NOT include Authorization header
    const refreshResult = await rawBaseQuery(
      {
        url: "api/token/refresh/",
        method: "POST",
        body: { refresh },
        headers: {}, // override auth header
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.access) {
      api.dispatch(
        setCredentials({
          access: refreshResult.data.access,
          refresh, // keep existing refresh token
          user: api.getState().auth.user,
        })
      );

      // retry original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // refresh expired or blacklisted
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // ⚠️ This endpoint name is misleading
    // JWTs come from Google session → get_jwt_token
    fetchJwt: builder.query({
      query: () => "api/auth/get-jwt-token/",
    }),

    logout: builder.mutation({
      query: (refresh) => ({
        url: "api/auth/logout/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const { useFetchJwtQuery, useLogoutMutation } = authApi;
