import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { CANDLESTICK } from "../utils/Constants";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
    volumeData: [],
    timeStamp: 0,
    dataLimit: 280,
    chartType: CANDLESTICK,
  },
  reducers: {
    updateChartData: (state, action) => {
      state.chartData = action.payload.chartData;
      state.volumeData = action.payload.volumeData;
    },
    updateChartType: (state, action) => {
      state.chartType = action.payload;
    },
    updateTimeStamp: (state, action) => {
      state.timeStamp = action.payload;
    },
    updateDataLimit: (state, action) => {
      state.dataLimit = action.payload;
    },
  },
});

export const {
  updateChartData,
  updateChartType,
  updateDataLimit,
  updateTimeStamp,
} = chartSlice.actions;
export default chartSlice.reducer;
