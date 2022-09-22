import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Candle from "../views/candle/Candle";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/" element={<Candle />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
