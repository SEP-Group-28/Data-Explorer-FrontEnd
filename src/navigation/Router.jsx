import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Candle from "../views/candle/Candle";
import HomeView from "../views/homeView/homeView";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
