import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import alertReducer from "./alert"
import profileReducer from "./profile"
import chartReducer from "./chart"
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const presistAlertConfig = {
    key: 'token',
    storage,
}
const presistProfileConfig = {
    key: 'profile',
    storage,
}

const presistProfileReducer = persistReducer(presistProfileConfig, profileReducer)
const presistAlertReducer = persistReducer(presistAlertConfig, alertReducer)

export const store = configureStore({
  reducer: {
    alert: presistAlertReducer,
    profile: presistProfileReducer,
    chart: chartReducer,
  },
  middleware: [thunk],
});

export const presistor = persistStore(store)
