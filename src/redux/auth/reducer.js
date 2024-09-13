import { getCookie } from "../../utils/cookies";
import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  token: getCookie("authToken") || null,
  user: null,
  successMessage: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return { ...state, loading: true, error: null, successMessage: "" };

    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
        successMessage: "Login successful",
      };

    case types.LOGIN_ERROR:
    case types.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: "",
      };

    case types.AUTH_LOGOUT:
      return { ...state, token: null, user: null, successMessage: "User logged out" };

    default:
      return state;
  }
}
