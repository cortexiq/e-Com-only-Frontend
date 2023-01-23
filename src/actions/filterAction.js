import axios from "axios";
import {
  LIST_VIEW,
  GRID_VIEW,
  LOAD_PRODUCTS,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
} from "../constants/filterConstants";
import { BASE_URL } from "../utils/urls";
import products from "../data/products";

export const allProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    // const { data } = await axios.get(
    //   `${BASE_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    // );
    const data = products;

    dispatch({
      type: LOAD_PRODUCTS,
      payload: data,
    });
  };

export const setGridView = () => async (dispatch) => {
  dispatch({
    type: GRID_VIEW,
  });
};

export const setListView = () => async (dispatch) => {
  dispatch({
    type: LIST_VIEW,
  });
};

export const updateSort = (value) => async (dispatch) => {
  dispatch({ type: UPDATE_SORT, payload: value });
  dispatch({ type: SORT_PRODUCTS, payload: value });
};

export const updateFilters = (value, name) => async (dispatch) => {
  dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  dispatch({ type: FILTER_PRODUCTS, payload: value });
};

export const clearFilters = (value) => async (dispatch) => {
  dispatch({ type: CLEAR_FILTERS });
};
