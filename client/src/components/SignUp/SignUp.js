import React, { Component } from "react";
import superagent from "superagent";
import PasswordMask from "react-password-mask";
import "./SignUp.css";

import Footer from "../Footer/Footer";

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
      loading: false,
      errorMessage: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  signUp = e => {
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
          alert("SignUp Successful");
          return;
        }
        window.localStorage.setItem("token", response.body.token);
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="main">
            <div className="main-center">
              <h5>Sign up once and read blogs as well as post</h5>
              <form className="" encType="multipart/form-data">
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
                  <label htmlFor="confirm">Password</label>
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

                <button type="submit" onClick={this.signUp} className="signup">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SignUp;
