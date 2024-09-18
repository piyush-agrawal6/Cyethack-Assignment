import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Navbar from "../components/Navbar/Navbar";
import List from "../pages/List/List";
import ListDetails from "../pages/Details/ListDetails";
import Signup from "../pages/Signup/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/details" element={<ListDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
