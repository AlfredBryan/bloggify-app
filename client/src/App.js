import React, { Component } from "react";
import "./App.css";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import Home from "./components/Home/Home";
import SinglePost from "./components/Blog/SinglePost";
import Blog from "./components/Post/Blog";
import Comment from "./components/comments/Comment";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="">
        <Router>
          <div>
            <CustomNavbar />
            <Route exact path="/" component={Home} />
            <Route path="/register" component={SignUp} />
            <Route path="/addblog" component={Blog} />
            <Route path="/comments" component={Comment} />
            <Route path="/post/:id" component={SinglePost} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
