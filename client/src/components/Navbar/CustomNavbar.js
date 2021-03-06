import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CustomNavbar.css";

class CustomNavbar extends Component {
  render() {
    return (
      <div>
        <div
          class="container-fluid"
          style={{
            backgroundColor: "white",
            color: "black",
            height: "150px"
          }}
        >
          <img
            src={require("../images/bloggify.png")}
            style={{
              height: "150px",
              width: "200px",
            }}
            alt="logo"
          />
        </div>

        <nav className="navbar " data-spy="affix" data-offset-top="197">
          <ul className="nav navbar-nav">
            <li className="active">
              <Link to="/">
                <span class="glyphicon glyphicon-home" />
                HOME
              </Link>
            </li>
            <li>
              <a href="#">
                <span class="glyphicon glyphicon-list-alt" />
                POST
              </a>
            </li>
            <li>
              <Link to="/addblog">
                <span class="glyphicon glyphicon-pencil" />
                WRITE POST
              </Link>
            </li>
            <li>
              <Link to="/register">
                <span class="glyphicon glyphicon-user" />
                JOIN
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default CustomNavbar;
