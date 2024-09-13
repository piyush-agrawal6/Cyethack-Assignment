import axios from "axios";
import * as types from "./types";
let URL = import.meta.env.VITE_APP_BASE_URL;

// login
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_STUDENT_REQUEST });
    const res = await axios.post(`${URL}/auth/student/login`, data);
    dispatch({
      type: types.LOGIN_STUDENT_SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token,
        message: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// google login
export const googleLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_STUDENT_REQUEST });
    const res = await axios.post(`${URL}/auth/student/google/login`, data);
    dispatch({
      type: types.GOOGLE_LOGIN_STUDENT_SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token,
        message: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GOOGLE_LOGIN_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// register
export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_STUDENT_REQUEST });
    const res = await axios.post(`${URL}/auth/student/register`, data);
    dispatch({
      type: types.REGISTER_STUDENT_SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token,
        message: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: types.REGISTER_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// google register
export const googleRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_REGISTER_STUDENT_REQUEST });
    const res = await axios.post(`${URL}/auth/student/google/register`, data);
    dispatch({
      type: types.GOOGLE_REGISTER_STUDENT_SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token,
        message: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: types.GOOGLE_LOGIN_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update student
export const editStudent = (data, token, studentId) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_STUDENT_REQUEST });
    let res = await axios.patch(`${URL}/student/${studentId}`, data, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: types.EDIT_STUDENT_SUCCESS,
      payload: { data, message: res.data.message },
    });
  } catch (error) {
    dispatch({
      type: types.EDIT_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// email verification
export const emailVerification = (email) => async (dispatch) => {
  try {
    dispatch({ type: types.EMAIL_VERIFICATION_REQUEST });
    let res = await axios.post(`${URL}/auth/student/send/otp`, { email });
    console.log(res.data);
    dispatch({
      type: types.EMAIL_VERIFICATION_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.EMAIL_VERIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// reset link
export const resetLink = (email) => async (dispatch) => {
  try {
    dispatch({ type: types.RESET_LINK_REQUEST });
    let res = await axios.post(`${URL}/auth/student/reset/link`, {
      email,
    });
    dispatch({
      type: types.RESET_LINK_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: types.RESET_LINK_ERROR,
      payload: error.response.data.message,
    });
  }
};

// reset password
export const resetPassword =
  (studentId, resetToken, password) => async (dispatch) => {
    try {
      dispatch({ type: types.RESET_PASSWORD_REQUEST });
      let res = await axios.post(
        `${URL}/auth/student/reset/password/${studentId}/${resetToken}`,
        {
          password,
        }
      );
      dispatch({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      dispatch({
        type: types.RESET_PASSWORD_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// change password
export const changePassword =
  (studentId, oldPassword, newPassword, token) => async (dispatch) => {
    try {
      dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
      let res = await axios.post(
        `${URL}/auth/student/change/password/${studentId}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({
        type: types.CHANGE_PASSWORD_SUCCESS,
        payload: res.data.message,
      });
      return res.data
    } catch (error) {
      dispatch({
        type: types.CHANGE_PASSWORD_ERROR,
        payload: error.response.data.message,
      });
      return error.response.data.message
    }
  };

// logout
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log("An error occurred");
  }
};

// clear message
export const clearMessage = () => async (dispatch) => {
  try {
    dispatch({
      type: types.CLEAR_MESSAGE,
    });
  } catch (error) {
    console.log("An error occurred");
  }
};

// check auth
export const checkAuth = (user, token) => async (dispatch) => {
  try {
    dispatch({
      type: types.CHECK_AUTH,
      payload: { user, token },
    });
  } catch (error) {
    console.log("An error occurred");
  }
};
