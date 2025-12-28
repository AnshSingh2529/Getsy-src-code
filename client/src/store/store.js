import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import { authApi } from "../api/api/authApi.js";
import tenantReducer from "../features/tenants/tenantSlice.js";
import propertyReducer from "../features/property/propertySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tenant: tenantReducer,
    property: propertyReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
