import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from "./components/Session";
import { withFirebase } from "./components/Firebase";
//import { dateglu } from "./components/Firebase";
const State = {
  firstInstance: "testing",
  glucose: "127",
  date: "agust",
  data: ""
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...State };
  }
  componentDidMount() {
    //this.createGlucoseNode(this.props.firebase.auth.O);
    this.onSubmit();
    this.retrieveGluDate();
  }

  retrieveGluDate = () => {
    var uid = this.props.firebase.auth.O;
    const data = this.props.firebase
      .retrieve(uid)
      .then(s => {
        console.log("resolved promise is returning ... ", s);
        this.setState({
          data: s
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    console.log("retrive is working ...", uid);
    console.log("this is data . . .", data);
  };

  createGlucoseNode = g => {
    const { firstInstance } = this.state;
    this.props.firebase.crg(g).update({
      glucoseLevels: [firstInstance]
    });
  };

  onSubmit = () => {
    const { glucose, date } = this.state;
    var uid = this.props.firebase.auth.O;
    this.props.firebase.glda(uid, glucose, date);

    event.preventDefault();
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
            <h1>Account: {authUser.email} </h1>
            {console.log("this is the state I want ...", this.state.data)}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Profile));
