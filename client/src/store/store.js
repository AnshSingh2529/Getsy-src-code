import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice.js";
import { authApi } from "../services/api/authApi.js";
import tenantReducer from "../store/tenant/tenantSlice.js";
import propertyReducer from "../store/property/propertySlice.js";

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
