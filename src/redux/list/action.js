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

// Fetch list action
export const fetchList = () => async (dispatch) => {
  dispatch({ type: FETCH_LIST_REQUEST });
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/list/get`,
      {
        withCredentials: true, // Ensure the cookie is sent with the request
      }
    );
    dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(
      "Error fetching list:",
      error.response?.data || error.message
    );
    if (error.response?.status === 401) {
      await logout(); 
    }
    dispatch({ type: FETCH_LIST_FAILURE, payload: error.message });
  }
};

// Edit list item action
export const editListItem = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/list/edit/${id}`,
      updatedData,
      {
        withCredentials: true, // Include credentials
      }
    );
    dispatch({ type: EDIT_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(
      "Error editing list item:",
      error.response?.data || error.message
    );
    if (error.response?.status === 401) {
      await logout(); // Ensure automatic logout on token expiration
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
    await axios.delete(
      `${import.meta.env.VITE_APP_BASE_URL}/list/delete/${id}`,
      {
        withCredentials: true, // Include credentials
      }
    );
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
  } catch (error) {
    console.error(
      "Error deleting list item:",
      error.response?.data || error.message
    );
    if (error.response?.status === 401) {
      await logout(); // Ensure automatic logout on token expiration
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
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/list/add`,
      newItem,
      {
        withCredentials: true, // Include credentials
      }
    );
    dispatch({ type: ADD_LIST_ITEM, payload: response.data });
  } catch (error) {
    console.error(
      "Error adding list item:",
      error.response?.data || error.message
    );
    if (error.response?.status === 401) {
      await logout(); // Ensure automatic logout on token expiration
    }
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
