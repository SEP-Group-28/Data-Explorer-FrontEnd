import { configureStore } from '@reduxjs/toolkit'
import alertReducer from "./alert"
import profileReducer from "./profile"
import chartReducer from "./chart"

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    profile: profileReducer,
    chart: chartReducer,
  },
});