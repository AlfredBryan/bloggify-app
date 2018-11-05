import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import superagent from "superagent";

import Footer from "../Footer/Footer"
import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          usename: "",
          password:"",
          loading: false
        }
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = e => {
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
              this.setState({ loading: true });
              return;
            }
          });
      };

  render() {
    if (this.state.loading) {
        return <Redirect to={"/userdashboard"} />;
      }

    return (
      <div>
        <div class="container">
          <div class="row" style={{ marginTop: "20px" }}>
            <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
              <form encType="multipart/form-data">
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
                        onClick={this.login}
                      />
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6">
                      <Link to="/register" class="btn btn-lg btn-primary btn-block">
                        Register
                      </Link>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Login;
