import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProperties: [],
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.allProperties = action.payload;
    },
  },
});

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;
