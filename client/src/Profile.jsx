import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log("checking for ...", AuthUserContext.Consumer);
    return <div>I am Profile</div>;
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);
