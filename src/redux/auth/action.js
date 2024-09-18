import axios from "axios";
import * as types from "./types";
import { removeCookie } from "../../utils/cookies";
let URL = import.meta.env.VITE_APP_BASE_URL;

// Login action
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const res = await axios.post(`${URL}/auth/login`, data, {
      withCredentials: true,
    });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.LOGIN_ERROR,
      payload: error.response?.data?.message || "Login error",
    });
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
  } catch (error) {
    dispatch({
      type: types.REGISTER_ERROR,
      payload: error.response?.data?.message || "Signup error",
    });
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${URL}/auth/logout`, { withCredentials: true });
    dispatch({ type: types.AUTH_LOGOUT });
  } catch (error) {
    console.log("Error during logout", error);
  }
};

export const loginSuccess = (payload) => (
  {
    type: types.LOGIN_SUCCESS,
    payload,
  }
);
