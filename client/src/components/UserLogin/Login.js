import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import superagent from "superagent";
import { connect } from "react-redux";

import Footer from "../Footer/Footer";
import { userLogin } from "../../actions/userActions";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      password: "",
      loading: false
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    let { username, password } = this.state;
    e.preventDefault();
    this.props.dispatch(userLogin({ username, password }));
  };

  /*login = e => {
    e.preventDefault();
    superagent
      .post("/api/users/login")
      .send({
        username: this.state.username,
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
          this.setState({userId: response.body.user._id})
          this.setState({ loading: true });
          
          return;
        }
      });
  };*/

  render() {
    let { userId, loading, error } = this.props;
    console.log(userId);
    console.log(loading);

    let id = userId;
   if (loading) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div>
        <div class="container">
          <div class="row" style={{ marginTop: "20px" }}>
            <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
              <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <fieldset>
                  <h2>Please Sign In</h2>
                  <hr class="colorgraph" />
                  <div class="form-group">
                    <input
                      type="username"
                      name="username"
                      id="username"
                      class="form-control input-lg"
                      placeholder="Username"
                      onChange={this.handleChange}
                      value={this.state.username}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control input-lg"
                      placeholder="Password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                  </div>
                  <span class="button-checkbox">
                    <Link to="" class="btn btn-link pull-right">
                      Forgot Password?
                    </Link>
                  </span>
                  <hr class="colorgraph" />
                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6">
                      <input
                        type="submit"
                        class="btn btn-lg btn-success btn-block"
                        value="Sign In"
                      />
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6">
                      <Link
                        to="/register"
                        class="btn btn-lg btn-primary btn-block"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </fieldset>
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
  userId: state.users.userId,
  loading: state.users.loading,
  error: state.users.error
});

export default connect(mapStateToProps)(Login);
