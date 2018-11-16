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

    componentDidMount() {
      this.fetchUser(this.state.userId);
    }

    static getDerivedStateFromProps(props, prevState) {
        if (props.match.params.id !== prevState.userId) {
          return {
            userId: props.match.params.id
          };
        }
        return null;
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState.userId !== this.state.userId) {
          this.fetchPost(this.state.userId);
        }
      }
    
      fetchUser(id) {
        fetch(`/api/user/${id}`)
          .then(res => res.json())
          .then(user => this.setState({ user: user }));
      }  

  render() {
    console.log(this.state.user)
    const user = this.state.user
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
                    country
                  </div>
                  <div class="panel-body text-left">
                    <div class="row">
                      <div class="col-md-12 ">
                        <center>
                          <a class="" href="#">
                            <div
                              class="media-object dp img-circle"
                              style={{width: "180px",height:"180px", backgroundColor:"black"}}
                            />
                          </a>
                        </center>
                      </div>
                      <div class="col-md-12">
                        <h2>{user.firstName}</h2>
                        <p>Software Developer at ceymplon</p>
                        <p>
                          <a href="#" class="remove-decoration">
                            <i class="glyphicon glyphicon-envelope" />{" "}
                            {user.email}
                          </a>{" "}
                          <br />
                          <a href="#" class="remove-decoration">
                            {" "}
                            <i class="glyphicon glyphicon-phone" />
                             {user.number}
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
