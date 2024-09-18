import axios from "axios";
import * as types from "./types";
import { notification } from "antd"; // Import notification from Ant Design
import { showNotification } from "../../utils/notification";
let URL = import.meta.env.VITE_APP_BASE_URL;

// Login action
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const res = await axios.post(`${URL}/auth/login`, data, {
      withCredentials: true,
    });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });

    // Show success notification
    showNotification("success", "Login Successful", "Welcome back!");
  } catch (error) {
    // Extract the error message from backend, or use a fallback
    const errorMessage = error.response?.data?.message || "Login error";
    dispatch({
      type: types.LOGIN_ERROR,
      payload: errorMessage,
    });

    // Show error notification with exact message from backend
    showNotification("error", "Login Failed", errorMessage);
  }
};

// Signup action
export const signup = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST });
    const res = await axios.post(`${URL}/auth/register`, data, {
      withCredentials: true,
    });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });

    // Show success notification
    showNotification(
      "success",
      "Signup Successful",
      "Account created successfully!"
    );
  } catch (error) {
    // Extract the error message from backend, or use a fallback
    const errorMessage = error.response?.data?.message || "Signup error";
    dispatch({
      type: types.REGISTER_ERROR,
      payload: errorMessage,
    });

    // Show error notification with exact message from backend
    showNotification("error", "Signup Failed", errorMessage);
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${URL}/auth/logout`, { withCredentials: true });
    dispatch({ type: types.AUTH_LOGOUT });

    // Show success notification
    showNotification(
      "info",
      "Logged Out",
      "You have been logged out successfully."
    );
  } catch (error) {
    // Extract the error message from backend, or use a fallback
    const errorMessage = error.response?.data?.message || "Logout error";
    showNotification("error", "Logout Failed", errorMessage);
  }
};
