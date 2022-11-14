import { createSlice } from "@reduxjs/toolkit";
import { CANDLESTICK } from "../utils/Constants";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
    chartType: CANDLESTICK,
  },
  reducers: {
    updateChartData: (state, action) => {
      state.chartData = action.payload;
    },
    updateChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { updateChartData,updateChartType } = chartSlice.actions;
export default chartSlice.reducer;
