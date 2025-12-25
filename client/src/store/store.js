import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import { authApi } from "../api/services/authApi.js";
import profileReducer from "../features/profile/profileSlice.js";
import { profileApi } from "../api/services/profileApi.js";
import tenantReducer from "../features/tenants/tenantSlice.js";
import propertyReducer from "../features/property/propertySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tenant: tenantReducer,
    property: propertyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});

export default store;
