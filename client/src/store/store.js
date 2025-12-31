import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import { authApi } from "../api/api/authApi.js";
import tenantReducer from "./tenant/tenantSlice.js";
import propertyReducer from "./property/propertySlice.js";

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
