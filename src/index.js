import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Sidebar from "./components/sidebar/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Motors from "./components/pages/motors/motors";
import Caravan from "./components/pages/caravan/caravan";
import Tuning from "./components/pages/tuning/tuning";
import UsedCar from "./components/pages/usedCar/usedCar";
import Users from "./components/pages/users/users";
import DisplaySideBar from "./components/sidebar/sidebarDisplay";
import Login from "./components/pages/login/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DisplaySideBar>
      <Sidebar />
    </DisplaySideBar>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/motors" element={<Motors />} />
      <Route path="/caravan" element={<Caravan />} />
      <Route path="/tuning" element={<Tuning />} />
      <Route path="/usedCar" element={<UsedCar />} />
      <Route path="/auth" element={<Users />} />
    </Routes>
  </BrowserRouter>
);
