import React, { Component } from "react";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      comments: {}
    };
  }

  componentDidMount() {
    const id = this.props.postId;
    fetch(`/api/post/${id}`)
      .then(res => res.json())
      .then(comments =>
        this.setState({ comments }, () => console.log(comments))
      );
  }

  render() {
    return <div />;
  }
}

export default Comment;
