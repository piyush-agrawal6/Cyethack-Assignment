// listReducer.js
import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  EDIT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  ITEM_ACTION_FAILURE,
  ADD_LIST_ITEM,
} from "./types";

const initialState = {
  loading: false,
  list: [],
  error: null,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case EDIT_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter((item) => item._id !== action.payload),
      };
    case ADD_LIST_ITEM:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case ITEM_ACTION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default listReducer;
