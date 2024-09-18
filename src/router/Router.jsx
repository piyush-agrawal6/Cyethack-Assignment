import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import List from "../pages/List/List";
import ListDetails from "../pages/Details/ListDetails";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/details" element={<ListDetails />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
