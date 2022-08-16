import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isShowOrderInfo: false
  },
  reducers: {
    toggleOrderInfo: (state) => {
      state.isShowOrderInfo = !state.isShowOrderInfo;
    },
  },
});

// Reducer
const appReducer = appSlice.reducer;

// Action
export const { toggleOrderInfo } = appSlice.actions;

// Selector
export const appSelector = (state) => state.appReducer;

export default appReducer;
