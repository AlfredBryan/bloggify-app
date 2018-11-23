import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment.js";
import superagent from "superagent";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import { fetchPost } from "../../actions/postActions";
import Footer from "../Footer/Footer";
import Spinner from "../../hoc/spinner/Spinner"

import "./Home.css";



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: ""
    };
  }

  /*componentDidMount() {
    fetch("/api/post")
      .then(res => res.json())
      .then(posts => this.setState({ posts }, () => console.log(posts)));
  }*/

  componentDidMount() {
    this.props.dispatch(fetchPost());
  }

  sendMail = e => {
    e.preventDefault();
    superagent
      .post("/mail")
      .send({
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      })
      .end((error, response) => {
        console.log(response);
        if (error) {
          alert("Message not sent");
        } else {
          alert("Message sent");
        }
      });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { posts, loading, error , comments} = this.props;
    console.log(posts);
    console.log(comments)

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
            <Spinner/>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Bloggify Posts</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="leftcolumn">
              {posts.map(post => (
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
                  <div className="bottom-line">
                    <div className="read">
                      <p>
                        <Link to={`/post/${post._id}`}>
                          <button className="btn-success">
                            <b>READ MORE »</b>
                          </button>
                        </Link>
                      </p>
                    </div>
                    <div className="vote-area">
                      <div className="post-votes">
                        <span class="glyphicon glyphicon-heart" />
                      </div>
                      <div className="vote-display">{post.likes_count}</div>
                    </div>
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
                <form onSubmit={this.handleSubmit}>
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name.."
                    onChange={this.handleChange}
                    value={this.state.name}
                  />

                  <label for="lname">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter last email.."
                    onChange={this.handleChange}
                    value={this.state.email}
                  />

                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={this.state.message}
                    placeholder="Enter message.."
                    style={{ height: "200px" }}
                    onChange={this.handleChange}
                  />

                  <input type="submit" value="Submit" />
                </form>
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

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error
});

export default connect(mapStateToProps)(Home);
