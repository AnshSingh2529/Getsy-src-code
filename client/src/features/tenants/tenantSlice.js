// src/store/tenantRequestSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tenantRequestSlice = createSlice({
  name: "tenantRequest",
  initialState: {
    currentRequest: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
    clearRequest: (state) => {
      state.currentRequest = null;
    },
  },
});

export const { setCurrentRequest, clearRequest } = tenantRequestSlice.actions;
export default tenantRequestSlice.reducer;
