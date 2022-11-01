import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap"
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "react-bootstrap/dist/react-bootstrap.min";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> 
  <Provider store={store}>   
    <App />
  </Provider>
  // </React.StrictMode>
);
// serviceWorkerRegistration.register();