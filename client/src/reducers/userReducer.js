import {
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  USER_LOGIN_BEGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from "../actions/types";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  number: "",
  password: "",
  image: "",
  loading: false,
  error: null
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        email: action.payload.email,
        number: action.payload.number,
        password: action.payload.password,
        loading: false,
        error: null
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        laoding: false,
        error: action.payload.error
      };
    case USER_LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        loading: false,
        error: null
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
