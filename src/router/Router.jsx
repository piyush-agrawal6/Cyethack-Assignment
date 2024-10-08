import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "@/Pages/Signup/SignupPage";
import LoginPage from "@/Pages/Login/LoginPage";
import Details from "@/Pages/Details/Details";
import List from "@/Pages/List/List";
import Navbar from "@/components/Navbar/Navbar";
import Home from "@/Pages/Home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/details" element={<Details />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
