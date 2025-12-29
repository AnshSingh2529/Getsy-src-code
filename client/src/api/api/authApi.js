import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";
import { isTokenExpiringSoon } from "../../utils/jwt";

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
  const state = api.getState();
  const access = state.auth.access;
  const refresh = state.auth.refresh;

  // 🔹 Step 3A: Pre-emptive refresh
  if (access && refresh && isTokenExpiringSoon(access)) {
    const refreshResult = await rawBaseQuery(
      {
        url: "api/token/refresh/",
        method: "POST",
        body: { refresh },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.access) {
      api.dispatch(
        setCredentials({
          access: refreshResult.data.access,
          refresh: refreshResult.data.refresh || refresh,
          user: state.auth.user,
        })
      );
    } else {
      api.dispatch(logout());
      return { error: { status: 401 } };
    }
  }

  // 🔹 Step 3B: Normal request
  let result = await rawBaseQuery(args, api, extraOptions);

  // 🔹 Step 3C: Reactive refresh (fallback)
  if (result?.error?.status === 401 && refresh) {
    const refreshResult = await rawBaseQuery(
      {
        url: "api/token/refresh/",
        method: "POST",
        body: { refresh },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.access) {
      api.dispatch(
        setCredentials({
          access: refreshResult.data.access,
          refresh: refreshResult.data.refresh || refresh,
          user: state.auth.user,
        })
      );

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
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
