import React, { Component } from "react";
import moment from "moment";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import "./SinglePost.css";

import Footer from "../Footer/Footer";
import {
  fetchSinglePost,
  postLike,
  addComment
} from "../../actions/postActions";
import Spinner from "../../hoc/spinner/Spinner";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.id,
      comment: ""
    };
  }

  componentDidMount() {
    let id = this.state.postId;
    this.props.dispatch(fetchSinglePost(id));
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.state.postId;
    const comment = this.state.comment;
    this.setState({ comment: "" });
    this.props.dispatch(addComment(id, { comment }));
  };

  likesHandleClick = () => {
    let id = this.state.postId;
    this.props.dispatch(postLike(id, "increment"));
  };

  dislikesHandleClick = () => {
    let id = this.state.postId;
    this.props.dispatch(postLike(id, "decrement"));
  };

  static getDerivedStateFromProps(props, prevState) {
    if (props.match.params.id !== prevState.postId) {
      return {
        postId: props.match.params.id
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.postId !== this.state.postId) {
      this.fetchPost(this.state.postId);
    }
  }

  render() {
    const { comments, posts, loading, error } = this.props;

    if (error) {
      return (
        <div className="errorcode">
          <div className="error">{error.message}</div>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="spinner">
          <div className="spinner-display">
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Post Comments</title>
        </Helmet>
        <div className="main-comment">
          <div className="detailBox">
            <div className="titleBox">
              <label>{posts.title}</label>
              <button type="button" className="close" aria-hidden="true">
                {posts.author}
              </button>
            </div>
            <div className="commentBox">
              <p className="taskDescription">{posts.post}</p>
              <div className="votes">
                <div className="vote">
                  <strong>vote</strong>
                </div>
                <div className="vote-click">
                  <p>
                    <span
                      className="glyphicon glyphicon-menu-up"
                      style={{ padding: "4px", fontWeight: 600 }}
                      onClick={this.likesHandleClick}
                      id="like-handler"
                    />
                  </p>
                  <p className="amount">{posts.likes_count}</p>
                  <p>
                    <span
                      className="glyphicon glyphicon-menu-down"
                      style={{ padding: "4px", fontWeight: 600 }}
                      onClick={this.dislikesHandleClick}
                      id="like-handler"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="actionBox">
              <div id="commentsystem">
                <div id="profpicture">
                  <iframe
                    src="https://www.facebook.com/plugins/feedback.php?api_key=113869198637480&href=codepen.io&numposts=5&sdk=joey&version=v2.10&width=500"
                    frameBorder="0"
                    allowtransparency="true"
                    className="facebook"
                  />
                </div>
                <form>
                  <textarea
                    minlenght="10"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    id="comment"
                    name="comment"
                    ref="comment"
                    rows="1"
                    placeholder="Write a comment..."
                    value={this.state.comment}
                    onChange={this.handleChange}
                  />
                  <div id="logintopost">
                    <div id="loginbtn">
                      <span className="fa-stack" style={{ fontSize: "16px" }}>
                        <i className="fa fa-circle-thin fa-stack-2x fa-inverse" />
                        <i className="fa fa-facebook fa-stack-1x fa-inverse" />
                      </span>
                    </div>
                  </div>
                  <div className="switch switch-facebook">
                    <input
                      id="fb-toggle"
                      className="switch-control"
                      type="checkbox"
                    />
                    <label className="switch-toggle" htmlFor="fb-toggle">
                      <div className="switch-handle">
                        <span>
                          <i className="fa fa-facebook" />
                        </span>
                      </div>
                    </label>
                  </div>
                  <span id="alsopost">Also post on Facebook</span>
                  <span id="count" />
                  <button id="send" type="submit" onClick={this.handleSubmit}>
                    <i style={{ fontize: "18px" }} /> POST
                  </button>
                </form>
                {comments && comments.map(comment => (
                  <ul id="commenttext" key={comment._id}>
                    <li id="commentbubble">
                      <div className="comment-style" />
                      <div id="commentwrap">
                        <div id="commentself">
                          <p id="messenger-bulle">
                            {comment.comment}
                            <span id="bullemeta">
                              {moment(comment.date).format(
                                "dddd, MMMM Do YYYY, h:mm:ss a"
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.post,
  comments: state.posts.comments,
  loading: state.posts.loading,
  error: state.posts.error
});

export default connect(mapStateToProps)(SinglePost);
