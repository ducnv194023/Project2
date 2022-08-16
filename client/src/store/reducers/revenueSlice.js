import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";
import moment from "moment";

export const getRevenueStatistic = createAsyncThunk(
  "revenue/statistic",
  async (formData) => {
    try {
      const res = await axios.post(
        `${config.constants.API_URL}/revenue-statistics`,
        formData
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    datasets: [],
    labels: [],
  },
  reducers: {},
  extraReducers: {
    [getRevenueStatistic.fulfilled]: (state, action) => {
      state.datasets = [];
      state.labels = [];
      action.payload.data.forEach((data) => {
        console.log(data);
        state.labels.push(moment(data.date).format("DD/MM/YYYY"));
        state.datasets.push(data.totalRevenueOfDay);
      });
    },
  },
});

// Reducer
const revenueReducer = revenueSlice.reducer;

// Selector
export const revenueSelector = (state) => state.revenueReducer;

export default revenueReducer;
