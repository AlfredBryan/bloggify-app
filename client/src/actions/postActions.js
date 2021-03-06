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
} from "./types";
import axios from "axios";

const apiUrl = "http://localhost:4000/api/post";

export const fetchPostBegin = () => ({
  type: FETCH_POST_BEGIN
});

export const fetchPostSuccess = posts => ({
  type: FETCH_POST_SUCCESS,
  payload: { posts }
});

export const fetchPostFailure = error => ({
  type: FETCH_POST_FAILURE,
  payload: { error }
});

export const fetchSinglePostBegin = () => ({
  type: FETCH_SINGLE_POST_BEGIN
});

export const fetchSinglePostSuccess = id => ({
  type: FETCH_SINGLE_POST_SUCCESS,
  payload: {
    post: id
  }
});

export const fetchSinglePostFailuire = error => ({
  type: FETCH_SINGLE_POST_FAILURE,
  payload: { error }
});

export const addLikeSuccess = data => {
  return {
    type: POST_VOTE_SUCCESS,
    payload: {
      _id: data._id,
      like_type: data.like_type
    }
  };
};

export const addNewComment = data => {
  return {
    type: ADD_NEW_COMMENT,
    payload: {
      _id: data._id,
      comments: data.comments
    }
  };
};

export const addPostBegin = () => ({
  type: ADD_POST_BEGIN
});

export const addPostSuccess = data => {
  return {
    type: ADD_POST_SUCCESS,
    payload: {
      author: data.author,
      title: data.title,
      post: data.post
    }
  };
};

export const addPostFailure = error => ({
  type: ADD_POST_FAILURE,
  payload: { error }
});

export function addPost({ image, title, post, author }) {
  return dispatch => {
    dispatch(addPostBegin());
    const formData = new FormData();
    formData.set("title", title);
    formData.set("post", post);
    formData.set("author", author);
    formData.append("image", image);
    console.log(image);
    axios({
      method: "post",
      url: `${apiUrl}/add`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        dispatch(addPostSuccess(response.data));
      })
      .catch(error => {
        dispatch(addPostFailure(error));
      });
  };
}

export function addComment(id, { comment }) {
  return dispatch => {
    axios
      .post(`${apiUrl}/${id}/comment`, { comment })
      .then(response => {
        dispatch(addNewComment(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function postLike(id, like_type) {
  return dispatch => {
    axios
      .post(`${apiUrl}/${id}/like`, { like_type: like_type })
      .then(response => {
        dispatch(addLikeSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function fetchSinglePost(id) {
  return dispatch => {
    dispatch(fetchSinglePostBegin(id));
    axios
      .get(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(fetchSinglePostSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchSinglePostFailuire(error));
      });
  };
}

export function fetchPost() {
  return dispatch => {
    dispatch(fetchPostBegin());
    return axios
      .get(`${apiUrl}`)
      .then(response => {
        dispatch(fetchPostSuccess(response.data));
      })
      .catch(error => dispatch(fetchPostFailure(error)));
  };
}
