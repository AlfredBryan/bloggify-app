import React, { Component } from "react";
import superagent from "superagent";
import PasswordMask from "react-password-mask";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./SignUp.css";

import Footer from "../Footer/Footer";
import { signUp } from "../../actions/userActions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      number: "",
      password: "",
      image: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = e => {
    e.preventDefault();
    let imageFile = e.target.files[0];
    this.setState({ [e.target.name]: imageFile });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state;
    this.props.dispatch(signUp(data));
  };

  /*signUp = e => {
    e.preventDefault();
    superagent
      .post("/api/users/signup")
      .send({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        number: this.state.number,
        password: this.state.password
      })
      .end((error, response) => {
        console.log(response);
        if (error) {
          this.setState({ errorMessage: error });
          alert("Error Signing Up");
          return;
        }
        if (response.ok) {
          this.setState({ loading: true });
          return;
        }
      });
  };*/

  render() {
    let { loading, error } = this.props;

    if (error) {
      return (
        <div className="errorcode">
          <div className="error">{error.message}</div>
        </div>
      );
    }

    if (loading) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div>
        <Helmet>
          <title>Join Bloggify</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <div className="main-center">
              <h5>Sign up once and read blogs as well as post</h5>
              <form
                action="post"
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <label htmlFor="name">First Name</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="Enter your First Name"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Last Name</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Enter your Last Name"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-users fa" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Enter your Username"
                      onChange={this.handleChange}
                      value={this.state.username}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Phone</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i
                        className="glyphicon glyphicon-earphone"
                        aria-hidden="true"
                      />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="number"
                      placeholder="Enter your Phone"
                      onChange={this.handleChange}
                      value={this.state.number}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Profile Picture</label>
                  <div className="">
                    <span className="input-group-addon">
                      <i
                        className="glyphicon glyphicon-picture"
                        aria-hidden="true"
                      />
                    </span>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={this.handleImageChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true" />
                    </span>
                    <PasswordMask
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your Password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                </div>
                <div className="register-bottom">
                  <div className="btn-2">
                    <button type="submit" className="signup">
                      SUBMIT
                    </button>
                  </div>
                  <div className="btn-1">
                    <Link to="/signin">
                      <button className="btn-success">LOGIN</button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.users.loading,
  error: state.users.error
});

export default connect(mapStateToProps)(SignUp);
