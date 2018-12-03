import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../../actions/userActions";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      user: ""
    };
  }

  componentDidMount() {
    let id = this.state.userId;
    this.props.dispatch(fetchUser(id));
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
      this.fetchUser(this.state.userId);
    }
  }

  /*fetchUser(id) {
        fetch(`/api/user/${id}`)
          .then(res => res.json())
          .then(user => this.setState({ user: user }));
      }  */

  render() {
    const { user } = this.props;
    console.log(user);
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
                            <img
                              src={user.image}
                              alt="profile-img"
                              class="media-object dp img-circle"
                              style={{
                                width: "180px",
                                height: "180px"
                              }}
                            />
                          </a>
                        </center>
                      </div>
                      <div class="col-md-12">
                        <h2>{user.firstName}</h2>
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
          <ul class="navbars color1">
            <li class="drpdown">
              <a href="#">
                <i class="icon20 comments" />
                <span>Posts</span>
              </a>
              <ul class="drpcontent">
                <li>
                  <a href="#">Latest Posts</a>
                </li>
                <li>
                  <a href="#">Private Posts</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i class="icon20 login" />
                <span>Update</span>
              </a>
            </li>
            <li class="drpdown">
              <a href="#">
                <i class="icon20 theme" />
                <span>Themeselector</span>
              </a>
              <ul class="drpcontent" id="themeselect">
                <li>
                  <a href="#" data-color="color1">
                    Orange
                  </a>
                </li>
                <li>
                  <a href="#" data-color="color2">
                    Marine
                  </a>
                </li>
                <li>
                  <a href="#" data-color="color3">
                    Green
                  </a>
                </li>
                <li>
                  <a href="#" data-color="color4">
                    Purple
                  </a>
                </li>
                <li>
                  <a href="#" data-color="color5">
                    Red
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(mapStateToProps)(Dashboard);
