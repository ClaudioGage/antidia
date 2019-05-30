import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
const State = {
  glucose: "",
  date: ""
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }

  render() {
    console.log("checking for ...", AuthUserContext.Consumer);
    console.log(this.props);
    console.log("id of the user", this.props.firebase.user);
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>
              Account: {authUser.email}{" "}
              {console.log("this is authUser. . .", authUser.uid)}
            </h1>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));
