// actions.js
import axios from "axios";
import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  ITEM_ACTION_FAILURE,
  EDIT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  ADD_LIST_ITEM,
} from "./types";
import { logout } from "../../utils/logout";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true, // Include credentials in all requests
});

export const fetchList = () => async (dispatch) => {
  dispatch({ type: FETCH_LIST_REQUEST });
  try {
    const response = await axiosInstance.get(`/list/get`);
    dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response?.status === 401) {
      await logout(); // Make sure to await the logout function
    }
    dispatch({ type: FETCH_LIST_FAILURE, payload: error.message });
  }
};

// Edit list item action
export const editListItem = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(`/list/edit/${id}`, updatedData);
    dispatch({ type: EDIT_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response?.status === 401) {
      await logout(); // Make sure to await the logout function
    }
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete list item action
export const deleteListItem = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/list/delete/${id}`);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
  } catch (error) {
    if (error.response?.status === 401) {
      await logout(); // Make sure to await the logout function
    }
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Add list item action
export const addListItem = (newItem) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/list/add`, newItem);
    dispatch({ type: ADD_LIST_ITEM, payload: response.data });
  } catch (error) {
    if (error.response?.status === 401) {
      await logout(); // Make sure to await the logout function
    }
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
