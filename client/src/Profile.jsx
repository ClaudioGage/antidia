import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
const State = {
  glucose: "134",
  date: ""
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }
  componentDidMount() {
    this.setglucose(this.props.firebase.auth.O);
  }

  setglucose = g => {
    const { glucose } = this.state;
    this.props.firebase.crg(g).set({
      glucose
    });
    console.log("is it getting invoked?...", g);
  };

  render() {
    console.log(
      "another way of getting the user id",
      this.props.firebase.auth.O
    );

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
