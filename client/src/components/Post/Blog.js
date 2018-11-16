import React, { Component } from "react";
import superagent from "superagent";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet"

import Footer from "../Footer/Footer";

import "./Blog.css";

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      author: "",
      title: "",
      post: "",
      newImage: "",
      loading: false
    };
  }

  addPost = e => {
    e.preventDefault();
    superagent
      .post("/api/post")
      .send({
        author: this.state.author,
        title: this.state.title,
        post: this.state.post,
        newImage: this.state.newImage
      })
      .end((error, response) => {
        console.log(response.body)
        console.log(error)
        if (response.ok) {
          this.setState({ loading: true });
        } else {
          return null;
        }
      });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
   {/* if (this.state.loading) {
      return <Redirect to={"/"} />;
    }*/}
console.log(this.state.newImage)
    return (
      <div>
        <Helmet>
          <title>Create Post</title>
        </Helmet>
        <div className="container-form">
          <h3>Post</h3>
          <form
            action="post"
            onSubmit={this.addPost}
            encType="multipart/form-data"
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
              id="newImage"
              name="newImage"
              value={this.state.newImage}
              onChange={this.handleChange}
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

export default Blog;
