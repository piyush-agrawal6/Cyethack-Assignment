
import * as types from "./types";
const initialState = {
  loading: false,
  verificationLoading: false,
  error: false,
  isAuthenticated: false,
  token: null,
  user: null,
  errorMessage: "",
  successMessage: "",
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.REGISTER_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
   
    case types.CLEAR_MESSAGE:
      return {
        ...state,
        error: false,
        errorMessage: "",
        successMessage: "",
        loading: false,
        verificationLoading: false,
      };
    default:
      return state;
  }
}
