import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../utils/requireAuth";
import Candle from "../views/candle/Candle";
import HomeView from "../views/homeView/homeView";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import NotFound from "../views/invalid_prohibited/NotFound";
import Unauthorized from "../views/invalid_prohibited/Unauthorized";
import CryptoView from "../views/cryptoView/CryptoView";

function Router() {

  const ROLES = {
    Admin: "1",
    User: "2",
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<HomeView />} />
        <Route path="/crypto" element={<CryptoView />} />

        {/* Invalid && prohibited routes  */}
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
