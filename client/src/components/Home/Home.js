import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment.js";
import "./Home.css";

import Footer from "../Footer/Footer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postId: this.props.match.params.id,
      Like: "",
      Unlike: ""
    };
  }

  componentDidMount() {
    fetch("/api/post")
      .then(res => res.json())
      .then(posts => this.setState({ posts }, () => console.log(posts)));
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="leftcolumn">
              {this.state.posts.map(post => (
                <div className="card" key={post._id}>
                  <h2 className="title">{post.title}</h2>
                  <h5>
                    {moment(post.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </h5>
                  <div className="fakeimg" style={{ height: "200px" }}>
                    Image
                  </div>
                  <p className="author">{post.author}</p>
                  <p className="post">{post.post}</p>
                  <div className="read">
                    <p>
                      <Link to={`/post/${post._id}`}>
                        <button className="btn-success">
                          <b>READ MORE »</b>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rightcolumn">
              <div className="card">
                <h2 className="title">About Me</h2>
                <img
                  className=""
                  src={require("../images/profile.png")}
                  style={{
                    height: "150px",
                    width: "150px",
                    borderRadius: "100px",
                    border: "1px solid black"
                  }}
                  alt="logo"
                />

                <p className="post">Am a nodejs & Reactjs developer</p>
              </div>
              <div className="card">
                <h3 className="title">Popular Post</h3>
                <div className="fakeimg">Image</div>
                <br />
                <div className="fakeimg">Image</div>
                <br />
                <div className="fakeimg">Image</div>
              </div>
              <div className="card">
                <h3 className="title">Follow Me</h3>
                <p className="post">Some text..</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
