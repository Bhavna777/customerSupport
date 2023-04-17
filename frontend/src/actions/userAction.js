import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ALL_EMPLOYEES_REQUEST,
  ALL_EMPLOYEES_SUCCESS,
  ALL_EMPLOYEES_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

// Login
export const login = (role, username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { role, username, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (role, username, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/signup`, { role, username, password }, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};


// Get Single User Details 
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { data } = await axios.get(`/api/v1/user/${id}`)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}



// Get All Employees
export const getEmployees = () => async (dispatch) => {
  try {
      dispatch({
          type: ALL_EMPLOYEES_REQUEST
      })

      const { data } = await axios.get("/api/v1/admin/employees")

      dispatch({
          type: ALL_EMPLOYEES_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type: ALL_EMPLOYEES_FAIL,
          payload: error.response.data.message,
      })
  }
}



// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
