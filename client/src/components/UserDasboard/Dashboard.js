import React, { Component } from "react";

import "./Dashboard.css";

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.match.params.id,
            user: ""
        }
    }

    static getDerivedStateFromProps(props, prevState) {
        if (props.match.params.id !== prevState.postId) {
          return {
            postId: props.match.params.id
          };
        }
        return null;
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState.postId !== this.state.postId) {
          this.fetchPost(this.state.postId);
        }
      }
    
      fetchPost(id) {
        fetch(`/api/users/${id}`)
          .then(res => res.json())
          .then(post => this.setState({ post: post, comments: post.comments }));
      }  

  render() {
    return (
      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-4" />
              <div class="col-md-4">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7pNHU2p0-Dg-GKO_4dVSwRZaX-tawZ2pzDD6lQ-_D_Bwil8dw" />{" "}
                    Sri Lanka
                  </div>
                  <div class="panel-body text-left">
                    <div class="row">
                      <div class="col-md-12 ">
                        <center>
                          <a class="" href="#">
                            <img
                              class="media-object dp img-circle"
                              src="data:image/jpeg;base64,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"
                              style={{width: "180px",height:"180px"}}
                            />
                          </a>
                        </center>
                      </div>
                      <div class="col-md-12">
                        <h2>{this.state.user.firstName}</h2>
                        <p>Software Developer at ceymplon</p>
                        <p>
                          <a href="#" class="remove-decoration">
                            <i class="glyphicon glyphicon-envelope" />{" "}
                            poolsachitha@gmail.com
                          </a>{" "}
                          <br />
                          <a
                            href="http://sachitha-seram.branded.me/"
                            target="_blank"
                            class="remove-decoration"
                          >
                            <i class="glyphicon glyphicon-globe" />{" "}
                            www.sachitha-seram.branded.me{" "}
                          </a>
                          <br />
                          <a href="#" class="remove-decoration">
                            {" "}
                            <i class="glyphicon glyphicon-phone" /> +94 710 000
                            000
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
