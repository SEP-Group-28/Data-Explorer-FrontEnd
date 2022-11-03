import { configureStore } from '@reduxjs/toolkit'
import alertReducer from "./alert"
import profileReducer from "./profile"

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    profile: profileReducer,
  },
})