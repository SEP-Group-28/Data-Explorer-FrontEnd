import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Candle from "../views/candle/Candle";
import HomeView from "../views/homeView/homeView";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import Profile from "../views/profile/Profile";
import UpdateProfile from "../views/profile/UpdateProfile";
import Watchlist from "../views/watchlist/Watchlist";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<HomeView />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/updateProfile" element={<UpdateProfile/>}/>
        <Route path="/watchlist" element={<Watchlist/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
