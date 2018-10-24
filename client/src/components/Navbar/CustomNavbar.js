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
            backgroundColor: "#F46036",
            color: "black",
            height: "150px"
          }}
        >
          <img
            src={require("../images/fullsizeoutput_40.jpeg")}
            style={{
              height: "150px",
              width: "120px",
              borderRadius: "100px",
              border: "1px solid black"
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
              <a href="#">
                <span class="glyphicon glyphicon-user" />
                JOIN
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default CustomNavbar;
