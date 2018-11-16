import React, { Component } from "react";
import "./App.css";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Home from "./components/Home/Home";
import SinglePost from "./components/Blog/SinglePost";
import Blog from "./components/Post/Blog";
import SignUp from "./components/SignUp/SignUp";
import { Route } from "react-router-dom";
import Dashboard from "./components/UserDasboard/Dashboard";
import Login from "./components/UserLogin/Login";

class App extends Component {
  render() {
    return (
      <div className="">
            <CustomNavbar />
            <Route exact path="/" component={Home} />
            <Route path="/register" component={SignUp} />
            <Route path="/addblog" component={Blog} />
            <Route path="/post/:id" component={SinglePost} />
            <Route path="/user/:id" component={Dashboard} />
            <Route path="/signin" component={Login} />
      </div>
    );
  }
}

export default App;
