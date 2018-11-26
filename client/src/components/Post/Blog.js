import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import Footer from "../Footer/Footer";
import { addPost } from "../../actions/postActions";

import "./Blog.css";

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      author: "",
      title: "",
      post: "",
      image: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.dispatch(addPost(data));
  };

  handleImageChange = e => {
    e.preventDefault();
    let imageFile = e.target.files[0];
    this.setState({ [e.target.name]: imageFile });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Create Post</title>
        </Helmet>
        <div className="container-form">
          <h3>Post</h3>
          <form
            action="post"
            onSubmit={this.handleSubmit}
            enctype="multipart/form-data"
          >
            <label for="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author.."
              value={this.state.author}
              onChange={this.handleChange}
            />

            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title.."
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label for="title">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={this.handleImageChange}
            />

            <label for="post">Post</label>
            <textarea
              id="post"
              name="post"
              placeholder="Write post.."
              value={this.state.post}
              onChange={this.handleChange}
              style={{ height: "200px" }}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.posts.loading,
  error: state.posts.error
});

export default connect(mapStateToProps)(Blog);
