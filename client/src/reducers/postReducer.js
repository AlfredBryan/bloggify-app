import {
  FETCH_POST_BEGIN,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_SINGLE_POST_BEGIN,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  POST_VOTE_SUCCESS,
  ADD_NEW_COMMENT,
  ADD_POST_BEGIN,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE
} from "../actions/types";
import { stat } from "fs";

const initialState = {
  posts: [],
  post: "",
  author: "",
  title: "",
  comments: [],
  comment: "",
  like_type: "",
  loading: false,
  error: null
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts
      };

    case FETCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        posts: []
      };
    case FETCH_SINGLE_POST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload.post,
        comments: action.payload.post.comments
      };

    case FETCH_SINGLE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case POST_VOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        like_type: action.payload.like_type
      };

    case ADD_NEW_COMMENT:
      return {
        ...state,
        loading: false,
        comment: action.payload.comment
      };
    case ADD_POST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        author: action.payload.author,
        title: action.payload.title,
        post: action.payload.post,
        loading: false,
        error: null
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error
      };

    default:
      return state;
  }
}
