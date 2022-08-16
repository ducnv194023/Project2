import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import appReducer from "./reducers/appSlice";
import orderReducer from "./reducers/orderSlice";
import itemReducer from "./reducers/itemSlice";
import revenueReducer from "./reducers/revenueSlice";

// Store
const store = configureStore({
  reducer: {
    authReducer,
    appReducer,
    orderReducer,
    itemReducer,
    revenueReducer,
  },
});

// Export
export default store;
