import React, { Component } from "react";
import superagent from "superagent";
import moment from "moment";
import { Helmet } from "react-helmet";
import "./SinglePost.css";

import Footer from "../Footer/Footer";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.id,
      post: "",
      comments: [],
      comment: "",
      like_type: ""
    };
  }

  componentDidMount() {
    this.fetchPost(this.state.postId);
  }

  postComment = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    superagent
      .post(`/api/post/${id}`)
      .send({ comment: this.state.comment })
      .end((error, response) => {
        console.log(error);
        console.log(response);
        if (error) {
          alert("Add comment failed");
        } else {
          alert("Add comment Successful");
        }
      });
    this.forceUpdate();
  };

  postLike = like_type => {
    const id = this.props.match.params.id;
    superagent
      .post(`/api/post/${id}/like`)
      .send({ like_type: like_type })
      .end((error, response) => {
        if (error) {
          alert("Add like failed");
        } else {
          alert("Add like Successful");
        }
      });
  };

  likesHandleClick = () => {
    this.postLike("increment");
    this.forceUpdate();
  };

  dislikesHandleClick = () => {
    this.postLike("decrement");
    this.forceUpdate();
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
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

  fetchPost(id) {
    fetch(`/api/post/${id}`)
      .then(res => res.json())
      .then(post => this.setState({ post: post, comments: post.comments }));
  }

  render() {
    console.log(this.state.post);
    if (this.state.post || this.state.comments) {
      return (
        <div>
          <Helmet>
            <title>Post Comments</title>
          </Helmet>
        <div className="main-comment">
          <div className="detailBox">
            <div className="titleBox">
              <label>{this.state.post.title}</label>
              <button type="button" className="close" aria-hidden="true">
                {this.state.post.author}
              </button>
            </div>
            <div className="commentBox">
              <p className="taskDescription">{this.state.post.post}</p>
              <div className="votes">
              <div className="vote"><strong>vote</strong></div>
                <div className="vote-click">
                <p>
                  <span
                    className="glyphicon glyphicon-menu-up"
                    style={{ padding: "4px",fontWeight:600 }}
                    onClick={this.likesHandleClick}
                    id="like-handler"
                  />
                </p>
                <p className="amount">{this.state.post.likes_count}</p>
                <p>
                  <span
                    className="glyphicon glyphicon-menu-down"
                    style={{ padding: "4px", fontWeight:600  }}
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
                <form action="post" encType="multipart/form-data">
                  <textarea
                    minlenght="10"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    id="comment"
                    name="comment"
                    rows="1"
                    placeholder="Write a comment..."
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
                  <button id="send" type="submit" onClick={this.postComment}>
                    <i style={{ fontize: "18px" }} /> POST
                  </button>
                </form>
                {this.state.comments.map(comment => (
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
    } else {
      return <h3>Not Found</h3>;
    }
  }
}

export default SinglePost;
