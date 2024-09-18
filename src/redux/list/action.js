import axios from "axios";
let URL = import.meta.env.VITE_APP_BASE_URL;
import {
  FETCH_LIST_REQUEST,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  ITEM_ACTION_FAILURE,
  EDIT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  ADD_LIST_ITEM,
} from "./types";

export const fetchList = () => async (dispatch) => {
  dispatch({ type: FETCH_LIST_REQUEST });
  try {
    const response = await axios.get(`${URL}/list/get`);
    console.log(response);
    dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_LIST_FAILURE, payload: error.message });
  }
};

// Edit list item action
export const editListItem = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL}/list/edit/${id}`, updatedData);
    dispatch({ type: EDIT_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete list item action
export const deleteListItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/list/delete/${id}`);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addListItem = (newItem) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/list/add`, newItem);
    dispatch({ type: ADD_LIST_ITEM, payload: response.data });
  } catch (error) {
    dispatch({
      type: ITEM_ACTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
