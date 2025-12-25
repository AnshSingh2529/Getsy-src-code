import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setProfile,
  updateProfile,
} from "../../features/profile/profileSlice.js";
import toast from "react-hot-toast";

export const profileApi = createApi({
  reducerPath: "profileApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AWS_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    // Fetch user profile
    getProfile: builder.query({
      query: () => "profile/userprofile/",
      providesTags: ["Profile"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProfile(data));
          toast.success("Profile updated successfully!");
        } catch {
          toast.error("Failed to load profile");
        }
      },
    }),

    // Request presigned URL for upload
    getPresignedUrl: builder.mutation({
      query: (ext) => ({
        url: "profile/avatar/presigned/",
        method: "POST",
        body: { ext },
      }),
    }),

    // Upload actual file to S3
    uploadAvatarToS3: builder.mutation({
      async queryFn({ file, url }) {
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!res.ok) return { error: "S3 upload failed" };
          return { data: { success: true } };
        } catch (err) {
          return { error: err.message };
        }
      },
    }),

    // Save uploaded URL to backend
    saveProfile: builder.mutation({
      query: (payload) => ({
        url: "profile/avatar/save/",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch {}
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetPresignedUrlMutation,
  useUploadAvatarToS3Mutation,
  useSaveProfileMutation,
} = profileApi;
