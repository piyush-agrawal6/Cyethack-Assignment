import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/Navbar/Navbar";
import AuthChecker from "./AuthChecker";
import List from "../Pages/List/List";
import ListDetails from "../pages/Details/ListDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthChecker />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/details" element={<ListDetails />} />
        </Route>

        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute>
              <Signup />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
