import {
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  USER_LOGIN_BEGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from "./types";
import axios from "axios";

const apiUrl = "http://localhost:4000/api/user";

export const addUserBegin = () => ({
  type: ADD_USER_BEGIN
});

export const addUserSuccess = data => ({
  type: ADD_USER_SUCCESS,
  payload: {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    number: data.number,
    password: data.password
  }
});

export const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  payload: { error }
});

export const userLoginBegin = () => ({
  type: USER_LOGIN_BEGIN
});

export const userLoginSuccess = data => ({
  type: USER_LOGIN_SUCCESS,
  payload: {
    username: data.username,
    password: data.password
  }
});

export const userLoginFailure = error => ({
  type: USER_LOGIN_FAILURE,
  payload: { error }
});

export function userLogin({ username, password }) {
  return dispatch => {
    dispatch(userLoginBegin());
    axios
      .post(`${apiUrl}/login`, { username, password })
      .then(response => {
        dispatch(userLoginSuccess(response.data));
        localStorage.setItem("user", response.data.token);
      })
      .catch(error => {
        dispatch(userLoginFailure(error));
      });
  };
}

export function signUp({
  image,
  firstName,
  lastName,
  username,
  email,
  number,
  password
}) {
  return dispatch => {
    dispatch(addUserBegin());
    const formData = new FormData();
    formData.set("firtName", firstName);
    formData.set("lastName", lastName);
    formData.set("username", username);
    formData.set("email", email);
    formData.set("number", number);
    formData.set("password", password);
    formData.append("image", image);
    console.log(image);
    axios({
      method: "post",
      url: `${apiUrl}/signup`,
      data: formData,
      Accept: "application/json",
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        dispatch(addUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(addUserFailure(error));
      });
  };
}
