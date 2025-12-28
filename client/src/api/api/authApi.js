import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

const baseQuery = fetchBaseQuery({
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
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refresh = api.getState().auth.refresh;

    if (!refresh) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "auth/token/refresh/",
        method: "POST",
        body: { refresh },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({
          access: refreshResult.data.access,
          refresh: refreshResult.data.refresh || refresh,
          user: api.getState().auth.user,
        })
      );

      result = await baseQuery(args, api, extraOptions);
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
    fetchJwt: builder.query({
      query: () => "auth/token/",
    }),

    logout: builder.mutation({
      query: (refresh) => ({
        url: "accounts/logout/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const { useFetchJwtQuery, useLogoutMutation } = authApi;
